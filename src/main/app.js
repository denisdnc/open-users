const start = (dbConnection, logger) => {
  const userRepository = require('src/main/interface-adapters/repositories/user-mongo-repository')(dbConnection, logger)

  const validator = require('approvejs')
  const owasp = require('owasp-password-strength-test')
  const validateUser = require('src/main/business-rules/validate-user')(validator, owasp)

  const crypto = require('src/main/infrastructure/crypto')()
  const createUser = require('src/main/business-rules/create-user')(validateUser, userRepository, crypto)
  const findUserById = require('src/main/business-rules/find-user-by-id')(userRepository)
  const validateUserPassword = require('src/main/business-rules/validate-user-password')(userRepository, crypto)
  const editUser = require('src/main/business-rules/edit-user')(userRepository, crypto)

  const express = require('express')
  const server = express()
  const bodyParser = require('body-parser')
  server.use(bodyParser.json())

  const userController =
    require('src/main/interface-adapters/controllers/user-controller')(logger, server, createUser, findUserById, validateUserPassword, editUser)
  userController.map()

  server.listen(process.env.PORT || 3000, () => {
    logger.log('info', 'Application started and listening on port:', process.env.PORT || '3000')
  })
}

const logger = require('src/main/infrastructure/logger')()
const database = require('src/main/infrastructure/database')()

database.connect((err, connection) => {
  if (err) throw logger.log('error', 'Error connecting database: ', err)
  logger.log('info', `Connected to database:\
                  \n databaseName: ${connection.databaseName}\
                  \n host: ${connection.serverConfig.host}\
                  \n port: ${connection.serverConfig.port}`)

  start(connection, logger)
})
