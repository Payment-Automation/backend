const env = require('./env')

module.exports = {
  monnify: {
    secretKey: env.MONNIFY_SECRET_KEY,
    apiKey: env.MONNIFY_API_KEY,
    monnifyBaseUrl: env.MONNIFY_BASE_API,
    monnifyContractCode: env.MONNIFY_CONTRACT_CODE
  }
}
