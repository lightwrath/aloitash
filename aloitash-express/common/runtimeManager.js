const path = require('path')
const { spawn } = require('child_process')
const scriptDirRelativePath = path.resolve('../scripts')

function execute(script) {
  const subprocess = spawn('bash', [
    `${scriptDirRelativePath}/${script}`
  ])

  subprocess.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  subprocess.stderr.on('data', (data) => {
    console.error(data.toString())
  })
  subprocess.on('exit', (code) => {
    console.info(`Script ${script} exited with code: ${code}`)
  })
}

module.exports = { 
  execute
}
