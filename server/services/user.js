const Mongo = require('../adaptors/mongodb')

module.exports = {
  createUser
}

async function createUser (data) {
  return Mongo.create('users', data)
}
