const express = require('express');
const router = express.Router();
const scriptManager = require('../common/scriptDir')

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../aloitash-client/build/index.html'))
})

router.get('/ui-wireframe', function(req, res) {
  const scriptArray = scriptManager.getScriptIndex()
  let scriptMap = {}
  scriptArray.forEach(script => {
    if (!scriptMap[script.tab]) {
      scriptMap[script.tab] = {}
    }
    if (!scriptMap[script.tab][script.section]) {
      scriptMap[script.tab][script.section] = []
    }
    scriptMap[script.tab][script.section].push(script.id)
  })
  res.end(JSON.stringify(scriptMap))
})

router.get('/script-index', function(req, res) {
  res.end(JSON.stringify(scriptManager.getScriptIndex()))
})

module.exports = router;
