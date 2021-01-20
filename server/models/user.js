const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: Number,
    required: true,
    minLength: 5
  },
  datecreated: {
    type: Date,
    default: Date.now()
  },
  bvn: {
    type: String
  },
  password: String
})

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'A user with the given email is already registered'
  }
})

module.exports = mongoose.model('user', UserSchema)
