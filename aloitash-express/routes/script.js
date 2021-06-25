const express = require('express');
const router = express.Router();

const scriptManager = require('../common/scriptDir')

router.get('/:id', function(req, res) {
  const scriptData = scriptManager.readScript(req.params.id)
  res.end(JSON.stringify(scriptData))
})

router.post('/<id>', function(req, res) {
})

router.put('/<id>', function(req, res) {
})

router.delete('/<id>', function(req, res) {
})

module.exports = router;
