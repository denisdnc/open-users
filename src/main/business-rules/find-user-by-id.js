const omit = require('object.omit')

module.exports = (userRepository) => {
  const execute = (id, callback) => {
    userRepository.findById(id, (error, user) => {
      if (error) {
        callback(error)
        return
      }

      if (!user) {
        callback({
          errors: [{
            message: 'user not found'
          }]
        })
        return
      }

      callback(null, omit(user, ['password']))
    })
  }

  return {
    execute: execute
  }
}
