const mongoose = require('mongoose')

const { name } = require('./package.json')
const config = require('./config/env')

require('productionize')(name)
console.log(config.message)

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const PORT = process.env.PORT || 1337

require('./server')({ port: PORT }, () => {
  console.log(`${name} listening on port ${PORT}`)
})
