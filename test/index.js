const tape = require('tape')
const port = require('get-port-sync')()

const server = require('../server')({ port })
const Client = require('../client')
const MongoDB = require('../server/adaptors/mongodb')

const endpoint = `http://localhost:${port}`
const client = Client({ endpoint })

tape('should get health', function (t) {
  client.getHealth(function (err, health) {
    if (err) t.error('should not error')

    t.ok(health.uptime, 'should get uptime')

    t.end()
  })
})

tape('should get all users', async function (t) {
  const users = await MongoDB.find('users')
  const expected = [{ _id: '6006313e19a3f965ad0d557d', username: 'phirmware', __v: 0 }]

  t.deepEqual(users, expected)
  t.end()
})

tape('Should get all users via api', function (t) {
  const expected = [{ _id: '6006313e19a3f965ad0d557d', username: 'phirmware', __v: 0 }]

  client.getUsers(function (err, data) {
    if (err) t.error(err)

    t.deepEqual(data, expected)
    t.end()
  })
})

tape('Should create user via api', function (t) {
  const data = { username: 'phirmware' }

  client.createUser(data, function (err, data) {
    if (err) t.error(err)

    t.deepEqual(data, data)
    t.end()
  })
})

tape('Should get user by id', async function (t) {
  const id = '6006313e19a3f965ad0d557d'
  const expected = {
    _id: '6006313e19a3f965ad0d557d',
    username: 'phirmware',
    __v: 0
  }

  const user = await MongoDB.findById('users', id)

  t.deepEqual(user, expected)
  t.end()
})

tape('cleanup', function (t) {
  server.close()

  t.end()
})
