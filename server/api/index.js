const router = require('express').Router()

const middleware = require('../middleware')
const userApi = require('./users')
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
