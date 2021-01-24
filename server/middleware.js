const cors = require('cors')()
const healthpoint = require('healthpoint')
const PassportService = require('./services/passport')
const JwtService = require('./services/jwt-service')

const { version } = require('../package.json')
const hp = healthpoint({ version }, healthChecks)

module.exports = {
  cors,
  health,
  jwtCheck,
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

function jwtCheck (req, res, next) {
  const token = JwtService.getTokenFromHeader(req)
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  const user = JwtService.checkJwt(token)
  req.user = user
  next()
}
