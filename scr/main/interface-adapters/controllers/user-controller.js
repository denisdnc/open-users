const omit = require('object.omit')

module.exports = (logger, server, createUser, findUserById, validateUserPassword, editUser) => {
  const create = (req, res) => {
    logger.log('info', 'userController: Received POST on /users with data: ', omit(req.body, ['password']))

    const user = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }

    createUser.execute(user, (error, data) => {
      if (error) {
        logger.log('info', `userController: POST on /users returned Unprocessable Entity`)
        res.status(422).json(error)
      }

      res.status(201).json(data)
    })
  }

  const isUserNotFound = (error) => {
    return error.errors && error.errors.includes({
      message: 'user not found'
    })
  }

  const findById = (req, res) => {
    const id = req.params.id
    logger.log('info', `userController: Received GET on /users/${id}`)

    findUserById.execute(id, (error, data) => {
      if (error) {
        if (isUserNotFound(error)) {
          logger.log('info', `userController: GET on /users returned Not Found`)
          res.status(404).json(error)
          return
        }

        logger.log('info', `userController: GET on /users returned Server Error, error: `, error)
        res.status(500).json(error)
        return
      }

      res.status(200).json(data)
    })
  }

  const validatePassword = (req, res) => {
    const id = req.params.id
    logger.log('info', `userController: Received POST on /users/${id}/password/valid`)

    const password = req.body.value

    validateUserPassword.execute(id, password, (error, data) => {
      if (error) {
        res.status(200).json({
          valid: false
        })
        return
      }

      res.status(200).json({
        valid: data
      })
    })
  }

  const edit = (req, res) => {
    const id = req.params.id
    logger.log('info', `userController: Received PUT on /users/${id} with data: `, omit(req.body, ['password']))

    const user = {
      id: id,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }

    editUser.execute(user, (error, result) => {
      if (error) {
        if (isUserNotFound(error)) {
          logger.log('error', `userController: PUT on /users/${id} returned Not Found`)
          res.status(404).json(error)
          return
        }

        logger.log('error', `userController: PUT on /users/${id} returned Server Error, error: `, error)
        res.status(500).json(error)
        return
      }

      res.status(200).json(result)
    })
  }

  const map = () => {
    server.post('/v1/users', create)
    server.get('/v1/users/:id', findById)
    server.put('/v1/users/:id', edit)
    server.post('/v1/users/:id/password/valid', validatePassword)
  }

  return {
    map: map
  }
}
