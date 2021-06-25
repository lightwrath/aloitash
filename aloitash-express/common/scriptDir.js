const path = require('path')
const fs = require('fs')

const runtime = require("./runtime")

const scriptDirPath = path.resolve('../scripts')

function getScriptIndex() {
  const scriptArray = fs.readdirSync(scriptDirPath)
  return scriptArray.map(file => readScript(file))
}

function readScript(scriptId) {
  const fullFilePath = `${scriptDirPath}/${scriptId}`
  if (!fs.existsSync(fullFilePath)) {
    console.error("\x1b[33m%s\x1b[0m", `${fullFilePath} was not found.`)
    return
  }
  const fullContents = fs.readFileSync(fullFilePath, 'UTF-8')
  return {
    id: getId(fullFilePath),
    tab: getTab(fullContents),
    section: getSection(fullContents),
    name: getName(fullContents),
    icon: getIcon(fullContents),
    isRunning: !!runtime.getProcessStream(getId(fullFilePath)) || null,
    content: fullContents
  }

  function getId(filePath) {
    return filePath.split('/').reverse()[0]
  }

  function getTab(fileContents) {
    const tabLine = fileContents.split(/\r?\n/).find(line => line.includes('#tab'))
    return split(tabLine)
  }

  function getSection(fileContents) {
    const sectionLine = fileContents.split(/\r?\n/).find(line => line.includes('#section'))
    return split(sectionLine)
  }

  function getName(fileContents) {
    const nameLine = fileContents.split(/\r?\n/).find(line => line.includes('#name'))
    return split(nameLine)
  }

  function getIcon(fileContents) {
    const iconLine = fileContents.split(/\r?\n/).find(line => line.includes('#icon'))
    return split(iconLine)
  }

  function split(line) {
    if (line) {
      return line.split('=')[1]
    } else {
      return "unknown"
    }
  }
}

module.exports = { getScriptIndex, readScript }
