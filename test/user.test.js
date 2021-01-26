const tape = require('tape')
const port = require('get-port-sync')()

const server = require('../server')({ port })
const Client = require('../client')
const MongoDB = require('../server/adaptors/mongodb')

const endpoint = `http://localhost:${port}`
const client = Client({ endpoint })

tape('Should create user via api', function (t) {
  const userData = {
    fullname: 'Ojukwu Chibuzor',
    username: 'phirmware',
    email: 'chibuzor.ojukwu@gmail.com',
    password: '12345',
    phonenumber: '09036229746'
  }
  const expected = {
    user: {
      fullname: 'Ojukwu Chibuzor',
      username: 'phirmware',
      email: 'chibuzor.ojukwu@gmail.com',
      phonenumber: '09036229746'
    },
    status: 'Success',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  }

  client.createUser(userData, function (err, data) {
    if (err) t.error(err)

    t.deepEqual(data, expected)
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
