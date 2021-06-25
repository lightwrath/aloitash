const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const EventEmitter = require('events');

const logDirRelativePath = path.resolve('../logs')
const scriptDirRelativePath = path.resolve('../scripts')

const processSteamCache = {}
function getProcessStream(entry) {
  if (entry) {
    return processSteamCache[entry]
  } else {
    return processSteamCache
  }
}

async function executeProcess(scriptId) {
  const subprocess = spawn('sh', [`${scriptDirRelativePath}/${scriptId}`])
  await setupProcessStream(subprocess, scriptId)
  await printProcessStreamToConsole(scriptId)
  await logProcessStreamToFile(scriptId)
}

async function setupProcessStream(subprocess, scriptId) {
  processSteamCache[scriptId] = new EventEmitter()

  subprocess.stdout.on('data', tunnelToProcessStream)
  subprocess.stderr.on('data', tunnelToProcessStream)
  subprocess.on('exit', closeProcessStream)

  function tunnelToProcessStream(data) {
    data.toString('utf-8').split('\n').forEach(line => {
      line = `[${(new Date).toISOString()}]: ${line}\n`
      processSteamCache[scriptId].emit('stdio', line)
    })
  }

  function closeProcessStream(exitCode) {
    tunnelToProcessStream(`>>> Process exited with code ${exitCode.toString()}. <<<`)
    processSteamCache[scriptId].emit('end', exitCode)
    processSteamCache[scriptId] = null
  }
}

async function printProcessStreamToConsole(scriptId) {
  processSteamCache[scriptId].on('stdio', (data) => {
    process.stdout.write(data)
  })
}

async function logProcessStreamToFile(scriptId) {
  const logFile = `${logDirRelativePath}/${scriptId}`
  processSteamCache[scriptId].on('stdio', (data) => {
    fs.appendFile(logFile, data, 'utf8', err => err && console.log(err))
  })
}

module.exports = { 
  getProcessStream,
  executeProcess
}
