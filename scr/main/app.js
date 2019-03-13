const start = (dbConnection, logger) => {
  const userRepository = require('scr/main/interface-adapters/repositories/user-mongo-repository')(dbConnection, logger)

  const validator = require('approvejs')
  const owasp = require('owasp-password-strength-test')
  const validateUser = require('scr/main/business-rules/validate-user')(validator, owasp)

  const crypto = require('scr/main/infrastructure/crypto')()
  const createUser = require('scr/main/business-rules/create-user')(validateUser, userRepository, crypto)
  const findUserById = require('scr/main/business-rules/find-user-by-id')(userRepository)
  const validateUserPassword = require('scr/main/business-rules/validate-user-password')(userRepository, crypto)
  const editUser = require('scr/main/business-rules/edit-user')(userRepository, crypto)

  const express = require('express')
  const server = express()
  const bodyParser = require('body-parser')
  server.use(bodyParser.json())

  const userController =
    require('scr/main/interface-adapters/controllers/user-controller')(logger, server, createUser, findUserById, validateUserPassword, editUser)
  userController.map()

  server.listen(process.env.PORT || 3000, () => {
    logger.log('info', 'Application started and listening on port:', process.env.PORT || '3000')
  })
}

const logger = require('scr/main/infrastructure/logger')()
const database = require('scr/main/infrastructure/database')()

database.connect((err, connection) => {
  if (err) throw logger.log('error', 'Error connecting database: ', err)
  logger.log('info', `Connected to database:\
                  \n databaseName: ${connection.databaseName}\
                  \n host: ${connection.serverConfig.host}\
                  \n port: ${connection.serverConfig.port}`)

  start(connection, logger)
})
