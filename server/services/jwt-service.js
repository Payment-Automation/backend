const jwt = require('jsonwebtoken')

module.exports = {
  generateJwt
}

function generateJwt (user) {
  const { username, _id, email, phonenumber } = user

  const token = jwt.sign(
    { username, _id, email, phonenumber },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  return token
}
