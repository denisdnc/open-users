module.exports = (repository, crypto) => {
  const execute = (user, callback) => {
    repository.findById(user.id, (error, currentUser) => {
      if (error) {
        callback(error)
        return
      }

      if (!currentUser) {
        callback({
          errors: [{
            message: 'user not found'
          }]
        })
        return
      }

      if (user.password) {
        user.password = crypto.generateHash(user.password)
      }

      repository.update(user, (error, updatedUser) => {
        if (error) {
          callback(error)
          return
        }

        delete updatedUser.password
        callback(null, updatedUser)
      })
    })
  }

  return {
    execute: execute
  }
}
