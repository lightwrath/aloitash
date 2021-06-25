var express = require('express');
var router = express.Router();
const { getProcess } = require('../common/runtime')

router.get('/:id/stdout', async function(req, res) {
  const scriptId = req.params.id
  const processStream = getProcess(scriptId)
  processStream.stdout.on('data', (output) => {
    res.write(`[${(new Date).toISOString()}]: ${output.toString()}`)
  })
  processStream.stderr.on('data', (error) => {
    res.write(`[${(new Date).toISOString()}]: ${error.toString()}`)
  })
  processStream.on('exit', code => {
    res.end(`[${(new Date).toISOString()}]: >>> Process exited with code ${code.toString()}. <<<`)
  })
})

module.exports = router;
