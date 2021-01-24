const Monnify = require('../../services/monnify')

module.exports = {
  initialize
}

async function initialize (req, res, next) {
  try {
    const response = await Monnify.initalizeTransaction(req.body)
    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
