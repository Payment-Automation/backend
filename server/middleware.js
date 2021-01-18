const cors = require('cors')()
const healthpoint = require('healthpoint')

const { version } = require('../package.json')
const hp = healthpoint({ version }, healthChecks)

module.exports = {
  cors,
  health
}

function health (req, res, next) {
  req.url === '/health' ? hp(req, res) : next()
}

function healthChecks (cb) {
  cb(null)
}
