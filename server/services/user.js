const Mongo = require('../adaptors/mongodb')
const PassportService = require('../services/passport')

module.exports = {
  createUser,
  userLogin
}

async function createUser (data) {
  return Mongo.createUser(data)
}

async function userLogin () {
  return PassportService.authenticate('local', { session: false })
}

// function generateToken () {

// }
