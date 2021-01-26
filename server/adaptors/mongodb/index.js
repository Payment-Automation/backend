const User = require('../../models/user')
// const Passport = require('../../services/passport')

const mockUsers = require('../../mocks/mock-user.json')

const IS_TEST = process.env.NODE_ENV === 'test'

const Models = {
  users: User
}

module.exports = {
  find,
  findById,
  create,
  createUser
}

async function find (model, options = {}) {
  if (IS_TEST) return findTest(model, {}, options)

  return Models[model].find()
}

async function createUser ({ username, fullname, email, phonenumber, password }) {
  if (IS_TEST) return { username, fullname, email, phonenumber }

  const newUser = new User({ username, fullname, email, phonenumber })
  await User.register(newUser, password)
  return { username, fullname, email, phonenumber }
}

async function findById (model, id, options = {}) {
  if (IS_TEST) return findByIdTest(model, id, options)

  return Models[model].findById(id)
}

async function create (model, data, options = {}) {
  if (IS_TEST) return createTest(data, Models[model].schema.obj)

  return Models[model].create(data)
}

async function findByIdTest (model, id, options = {}) {
  const condition = { id }
  return findTest(model, condition, options)
}

async function findTest (model, condition = {}, options = {}) {
  if (model === 'users') {
    if (condition.id) return mockUsers.find(user => user._id === condition.id)
    return mockUsers
  }
}

function createTest (data, schema) {
  const dataObjectToManipulate = Object.assign({}, data)
  const schemaKeysArray = Object.keys(schema)
  checkForInvalidFields(dataObjectToManipulate, schemaKeysArray)
  // compareSchemaToInputData(dataObjectToManipulate, schema)
  return data
}

function checkForInvalidFields (data, schemaKeysArray) {
  const hasInvalidField = Object.keys(data).some(field => !schemaKeysArray.includes(field))
  if (hasInvalidField) throw Error('Invalid fields' + hasInvalidField)
}

// function compareSchemaToInputData (data, schema) {
//   const dataKeysArray = Object.keys(data)

//   // retreives keys from schema that exists in input data
//   const activeSchemaKeys = _.pick(schema, dataKeysArray)
//   for (const dataKey of dataKeysArray) {
//     // sets the value belonging to the data key to its respected data type
//     !data[dataKey] ? data[dataKey] = activeSchemaKeys[dataKey] : data[dataKey] = getDataType(data[dataKey])
//   }
//   if (!_.isEqual(data, activeSchemaKeys)) throw Error(`data has one or more invalid field types`)
// }
