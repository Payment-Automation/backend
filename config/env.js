require('dotenv').config()

module.exports = {
  message: 'config message',
  MONNIFY_API_KEY: process.env.MONNIFY_API_KEY,
  MONNIFY_SECRET_KEY: process.env.MONNIFY_SECRET_KEY,
  MONNIFY_BASE_API: process.env.MONNIFY_BASE_API,
  MONNIFY_CONTRACT_CODE: process.env.MONNIFY_CONTRACT_CODE
}
