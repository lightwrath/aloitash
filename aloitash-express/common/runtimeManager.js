const path = require('path')
const { spawn } = require('child_process')
const scriptDirRelativePath = path.resolve('../scripts')

const runtimeStatusCache = {
}
function getRuntimeStatus(entry) {
  if (entry) {
    return runtimeStatusCache[entry]
  } else {
    return runtimeStatusCache
  }
}

async function execute(scriptId) {
  const subprocess = spawn('sh', [
    `${scriptDirRelativePath}/${scriptId}`
  ])
  runtimeStatusCache[scriptId] = true

  subprocess.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  subprocess.stderr.on('data', (data) => {
    console.error(data.toString())
  })
  subprocess.on('exit', (code) => {
    console.info(`Script ${scriptId} exited with code: ${code}`)
    runtimeStatusCache[scriptId] = false
  })
  return subprocess
}

module.exports = { 
  getRuntimeStatus,
  execute
}
