const Request = require('request')

module.exports = function (opts = {}) {
  const { endpoint } = opts
  const jar = Request.jar()
  const request = Request.defaults({ jar })

  return {
    getHealth,
    getUsers,
    createUser
  }

  function getHealth (cb) {
    const url = `${endpoint}/health`
    getJSON(url, cb)
  }

  function getUsers (cb) {
    const url = `${endpoint}/users`
    getJSON(url, cb)
  }

  function createUser (data, cb) {
    const url = `${endpoint}/users`
    // const opts = {
    //   headers: { authorization: userEmail }
    // }
    postJSON(url, data, {}, cb)
  }

  function getJSON (url, opts, cb) {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }
    opts.json = true
    request.get(url, opts, handleResponse(cb))
  }

  function postJSON (url, data, opts, cb) {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }
    opts.json = true
    opts.body = data
    request.post(url, opts, handleResponse(cb))
  }
}

function handleResponse (cb) {
  return function (err, res, body) {
    if (err) return cb(err)
    if (res.statusCode >= 400) {
      const defaultMsg = `Request Failed.\n Status Code: ${res.statusCode}`
      const serverMsg = (body || {}).error
      err = new Error(serverMsg || defaultMsg)
      err.statusCode = res.statusCode
      return cb(err)
    }

    cb(null, body)
  }
}
