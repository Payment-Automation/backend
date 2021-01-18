const express = require('express')
const bodyParser = require('body-parser')

const middleware = require('./middleware')

const app = express()

app.use(middleware.cors)
app.use(middleware.health)
app.options('*', middleware.cors)
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '5mb' }))

module.exports = (opts = {}, cb) => {
  const port = opts.port || 3000
  return app.listen(port, cb)
}
