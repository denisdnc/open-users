module.exports = (validateUser, userRepository, crypto) => {
  const execute = (user, callback) => {
    // do validations
    const errors = validateUser.execute(user)
    if (errors.length > 0) {
      // cleans password before return
      delete user.password
      callback({ errors: errors }, user)
      return
    }

    // encrypt passwrod before save
    user.password = crypto.generateHash(user.password)

    userRepository.create(user, (error, user) => {
      if (error) {
        const errorsResult = [{
          messages: ['error creating user on database']
        }]
        // cleans password before return
        delete user.password
        callback(errorsResult, user)
        return
      }

      // cleans password before return
      delete user.password
      callback(null, user)
    })
  }

  return {
    execute: execute
  }
}
