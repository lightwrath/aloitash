const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const logDirRelativePath = path.resolve('../logs')
const scriptDirRelativePath = path.resolve('../scripts')

const processCache = {}
function getProcess(entry) {
  if (entry) {
    return processCache[entry]
  } else {
    return processCache
  }
}
function removeFromCacheOnExit(scriptId) {
  const processStream = getProcess(scriptId)
  processStream.on('exit', code => {
    processCache[scriptId] = null
  })
}

async function execute(scriptId) {
  const subprocess = spawn('sh', [
    `${scriptDirRelativePath}/${scriptId}`
  ])
  processCache[scriptId] = subprocess
  logProcess(scriptId)
  removeFromCacheOnExit(scriptId)
  return subprocess
}

async function logProcess(scriptId) {
  const processStream = getProcess(scriptId)
  const logFile = `${logDirRelativePath}/${scriptId}`
  processStream.stdout.on('data', (output) => {
    const logLine = `[${(new Date).toISOString()}]: ${output.toString()}`
    console.log(logLine)
    fs.appendFile(logFile, logLine, 'utf8', err => err && console.log(err))
  })
  processStream.stderr.on('data', (error) => {
    const logLine = `[${(new Date).toISOString()}]: ${error.toString()}`
    console.log(logLine)
    fs.appendFile(logFile, logLine, 'utf8', err => err && console.log(err))
  })
  processStream.on('exit', code => {
    const logLine = `[${(new Date).toISOString()}]: >>> Process exited with code ${code.toString()}. <<<`
    console.log(logLine)
    fs.appendFile(logFile, logLine, 'utf8', err => err && console.log(err))
  })
}

module.exports = { 
  getProcess,
  execute
}
