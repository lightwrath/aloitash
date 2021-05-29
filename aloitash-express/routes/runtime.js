var express = require('express');
var router = express.Router();
const { execute } = require('../common/runtimeManager')

router.get('/:id', function(req, res) {
  execute(req.params.id)
  res.end()
})

module.exports = router;
