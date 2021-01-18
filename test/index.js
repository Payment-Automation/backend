const tape = require('tape')
const port = require('get-port-sync')()

const server = require('../server')({ port })
const Client = require('../client')

const endpoint = `http://localhost:${port}`
const client = Client({ endpoint })

tape('should get health', function (t) {
  client.getHealth(function (err, health) {
    if (err) t.error('should not error')

    t.equal(health.uptime, false, 'should get uptime')

    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()

  t.end()
})
