const express = require('express');
const router = express.Router();

const scriptManager = require('../common/scriptDir')
const { execute } = require('../common/runtime')

router.get('/:id', function(req, res) {
  const scriptData = scriptManager.readScript(req.params.id)
  res.end(JSON.stringify(scriptData))
})

router.get('/:id/execute', async function(req, res) {
  await execute(req.params.id)
  res.end(JSON.stringify({result: "success"}))
})

module.exports = router;
