const express = require('express');
const router = express.Router();
const scriptManager = require('../common/scriptDir')

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../aloitash-client/build/index.html'))
})

router.get('/script-index', function(req, res) {
  res.end(JSON.stringify(scriptManager.getScriptIndex()))
})

module.exports = router;
