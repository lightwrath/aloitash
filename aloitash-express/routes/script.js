const express = require('express');
const router = express.Router();

const scriptManager = require('../common/scriptDir')
const { executeProcess } = require('../common/runtime')

router.get('/:id', function(req, res) {
  const scriptData = scriptManager.readScript(req.params.id)
  res.end(JSON.stringify(scriptData))
})

router.get('/:id/execute', async function(req, res) {
  await executeProcess(req.params.id)
  res.end(JSON.stringify({result: "success"}))
})

module.exports = router;
