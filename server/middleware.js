const cors = require('cors')()
const healthpoint = require('healthpoint')
const PassportService = require('./services/passport')

const { version } = require('../package.json')
const hp = healthpoint({ version }, healthChecks)

module.exports = {
  cors,
  health,
  authenticate: authenticate()
}

function health (req, res, next) {
  req.url === '/health' ? hp(req, res) : next()
}

function healthChecks (cb) {
  cb(null)
}

function authenticate () {
  return PassportService.authenticateLocal
}
