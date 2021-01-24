const tape = require('tape')
const port = require('get-port-sync')()

const server = require('../server')({ port })
const Client = require('../client')

const endpoint = `http://localhost:${port}`
const client = Client({ endpoint })
const authToken = 'e-test-token'

tape('Should initialize payment for monnify', function (t) {
  const data = {
    amount: 100.00,
    customerName: 'Stephen Ikhane',
    customerEmail: 'stephen@ikhane.com',
    paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
    redirectUrl: 'https://my-merchants-page.com/transaction/confirm'
  }

  const expected = {
    transactionReference: 'MNFY|75|20210124205129|000802',
    paymentReference: '30190',
    merchantName: 'Payment Automation',
    apiKey: 'MK_TEST_HXFG2NR39N',
    redirectUrl: 'https://my-merchants-page.com/transaction/confirm',
    enabledPaymentMethod: ['CARD', 'ACCOUNT_TRANSFER'],
    checkoutUrl: 'https://sandbox.sdk.monnify.com/checkout/MNFY|75|20210124205129|000802'
  }

  client.initializeMonnifyTransaction(data, authToken, function (err, data) {
    if (err) t.error(err)

    t.deepEqual(data, expected)
    t.end()
  })
})

tape('Should return error if customer name is missing', function (t) {
  const data = {
    amount: 100.00,
    customerEmail: 'stephen@ikhane.com',
    redirectUrl: 'https://my-merchants-page.com/transaction/confirm'
  }

  client.initializeMonnifyTransaction(data, authToken, function (err, data) {
    if (err) t.ok(err)

    t.end()
  })
})

tape('Should return error if customer email is missing', function (t) {
  const data = {
    amount: 100.00,
    customerName: 'Stephen Ikhane',
    redirectUrl: 'https://my-merchants-page.com/transaction/confirm'
  }

  client.initializeMonnifyTransaction(data, authToken, function (err, data) {
    if (err) t.ok(err)

    t.end()
  })
})

tape('Should return error if redirect url is missing', function (t) {
  const data = {
    amount: 100.00,
    customerEmail: 'stephen@ikhane.com',
    customerName: 'test'
  }

  client.initializeMonnifyTransaction(data, authToken, function (err, data) {
    if (err) t.ok(err)

    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()

  t.end()
})
