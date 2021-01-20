const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const middleware = require('./middleware')
const api = require('./api')

const app = express()

app.use(middleware.cors)
app.use(middleware.health)
app.options('*', middleware.cors)
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '5mb' }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', api)

module.exports = (opts = {}, cb) => {
  const port = opts.port || 3000
  return app.listen(port, cb)
}
