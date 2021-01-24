const router = require('express').Router()

const middleware = require('../middleware')
const userApi = require('./users')
const monnifyApi = require('./monnify')
module.exports = router

router.get('/', (req, res, next) => {
  res.json({ message: 'Api Working' })
})

router.post(
  '/user/create',
  userApi.registerUser
)

router.post(
  '/user/authenticate',
  middleware.authenticate,
  userApi.generateJwtToken
)

router.post(
  '/monnify/initialize',
  monnifyApi.initialize
)
