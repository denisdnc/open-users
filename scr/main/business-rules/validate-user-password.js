module.exports = (userRepository, crypto) => {
  const execute = (userId, password, callback) => {
    userRepository.findById(userId, (error, user) => {
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

      const saltHash = crypto.generateHash(password, user.password.salt)

      if (saltHash.hash === user.password.hash) {
        callback(null, true)
      } else {
        callback({
          errors: [{
            message: 'password do not match'
          }]
        }, false)
      }
    })
  }

  return {
    execute: execute
  }
}
