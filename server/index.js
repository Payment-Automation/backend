const express = require('express')
const bodyParser = require('body-parser')

const Mongodb = require('./adaptors/mongodb')
const middleware = require('./middleware')
const UserService = require('./services/user')

const app = express()

app.use(middleware.cors)
app.use(middleware.health)
app.options('*', middleware.cors)
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '5mb' }))

app.get('/users', async (req, res, next) => {
  const users = await Mongodb.find('users')
  res.json(users)
})

app.post('/users', async (req, res, next) => {
  const { username } = await UserService.createUser(req.body)
  res.json({ username })
})

module.exports = (opts = {}, cb) => {
  const port = opts.port || 3000
  return app.listen(port, cb)
}
