const jwt = require('jsonwebtoken')
const IS_TEST = process.env.NODE_ENV === 'test'

module.exports = {
  generateJwt
}

function generateJwt (user) {
  if (IS_TEST) return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  const { username, _id, email, phonenumber } = user

  const token = jwt.sign(
    { username, _id, email, phonenumber },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  return token
}
