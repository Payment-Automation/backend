const jwt = require('jsonwebtoken')
const IS_TEST = process.env.NODE_ENV === 'test'

module.exports = {
  generateJwt,
  checkJwt,
  getTokenFromHeader
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

function getTokenFromHeader (req) {
  const authHeader = req.headers.authorization
  if (!authHeader) return false
  const arr = authHeader.split(' ')
  const token = arr[0] === 'Bearer' ? arr[1] : false
  return token
}

function checkJwt (token) {
  if (IS_TEST) return token
  let decodedToken
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return false
    decodedToken = decoded
  })
  return decodedToken
}
