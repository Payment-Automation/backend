const superagent = require('superagent')
const { monnifyBaseUrl, apiKey, secretKey, monnifyContractCode } = require('../../config').monnify
const initmonnifymock = require('../mocks/mock-monnify-init.json')

const IS_TEST = process.env.NODE_ENV === 'test'

module.exports = {
  initalizeTransaction
}

async function initalizeTransaction (details) {
  const transactionDetails = composeTransactionDetails(details)
  const encodedStr = encodeKeys()

  if (IS_TEST) return initmonnifymock
  const { body: { responseBody, requestSuccessful } } = await superagent
    .post(`${monnifyBaseUrl}/api/v1/merchant/transactions/init-transaction`)
    .set('Authorization', `Basic ${encodedStr}`)
    .send(transactionDetails)

  if (!requestSuccessful) throw new Error('Transaction initialization wasn\'t successfull')

  return responseBody
}

function encodeKeys () {
  const encodedStr = Buffer.from(`${apiKey}:${secretKey}`).toString('base64')
  return encodedStr
}

function composeTransactionDetails (details) {
  const detailsRequired = [
    'amount',
    'customerName',
    'customerEmail',
    'paymentReference',
    'paymentDescription',
    'currencyCode',
    'contractCode',
    'redirectUrl',
    'paymentMethods'
  ]
  const baseErrMessage = 'Can\'t initialize transaction'
  const paymentMethods = ['CARD', 'ACCOUNT_TRANSFER']
  const currencyCode = 'NGN'
  const paymentDescription = `School Fee Payment for ${details.customerName}`
  const paymentReference = `${Math.floor(Math.random() * 100000)}`

  Object.assign(details, {
    paymentMethods,
    paymentReference,
    contractCode: monnifyContractCode,
    currencyCode,
    paymentDescription
  })

  detailsRequired.forEach(key => {
    if (!details[key]) throw new Error(`${baseErrMessage}, ${key} missing`)
  })

  return details
}
