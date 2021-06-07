var express = require('express');
var router = express.Router();
const { execute } = require('../common/runtimeManager')

router.get('/:id', async function(req, res) {
  const subprocessEvent = await execute(req.params.id)

  subprocessEvent.on('exit', (code) => {
    res.end()
  })
})

module.exports = router;
