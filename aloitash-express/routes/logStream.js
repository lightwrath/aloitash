var express = require('express');
var router = express.Router();

const { getProcessStream } = require('../common/runtime')

router.get('/:id', async function(req, res) {
  const stdioStream = getProcessStream(req.params.id)

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked'
  })

  res.write('[')
  stdioStream.on('stdio', (data) => {
    res.write(`"${btoa(data)}",`)
  })
  stdioStream.on('end', () => {
    res.write('"end"')
    res.write(']')
    res.end()
  })
})

module.exports = router;
