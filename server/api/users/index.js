const UserService = require('../../services/user')
const JwtService = require('../../services/jwt-service')

module.exports = {
  registerUser,
  generateJwtToken
}

async function registerUser (req, res, next) {
  const { body: { username, email, phonenumber, password } } = req
  if (!username) return res.status(400).json({ message: 'No username provided' })
  if (!email) return res.status(400).json({ message: 'No email provided' })
  if (!phonenumber) return res.status(400).json({ message: 'No phone number provided' })

  try {
    const user = await UserService.createUser({ username, email, phonenumber, password })
    res.json({ user, status: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function generateJwtToken (req, res, next) {
  const token = JwtService.generateJwt(req.user)
  res.json({ status: true, token })
}