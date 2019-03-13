const ObjectID = require('mongodb').ObjectID
const clone = require('clone')

module.exports = (dbConnection, logger) => {
  const create = (user, callback) => {
    logger.log('debug', 'userRepository: Started creating user: ', user)
    dbConnection.collection('users').insertOne(user, (err, res) => {
      if (err) {
        logger.log('error', 'userRepository: Error creating user: ', err)
        return callback(err)
      }
      logger.log('debug', 'userRepository: Finished creating user: ', res)

      const createdUser = res.ops[0]
      createdUser.createdAt = createdUser._id.getTimestamp()
      return callback(null, createdUser)
    })
  }

  const findById = (id, callback) => {
    if (!ObjectID.isValid(id)) {
      return callback({
        messages: ['invalid id format: ', id]
      })
    }

    dbConnection
      .collection('users')
      .findOne({ _id: new ObjectID(id) }, (error, result) => {
        if (error) {
          logger.log('error', 'userRepository.findById error: ', error)
          return callback(error)
        }

        result.createdAt = result._id.getTimestamp()
        return callback(null, result)
      })
  }

  const update = (user, callback) => {
    const newData = clone(user)
    delete newData.id

    dbConnection
      .collection('users')
      .findOneAndUpdate({ _id: new ObjectID(user.id) }, { $set: newData }, { returnOriginal: false },
        (error, result) => {
          if (error) {
            logger.log('error', 'userRepository.update error: ', error)
            return callback(error)
          }

          result.value.createdAt = result.value._id.getTimestamp()
          return callback(null, result.value)
        })
  }

  return {
    create: create,
    findById: findById,
    update: update
  }
}
