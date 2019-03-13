/* test libs */
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

/* component dependencies */
const crypto = require('scr/main/infrastructure/crypto')()
const userRepository = {}

/* component to test */
const validateUserPassword = require('scr/main/business-rules/validate-user-password')(userRepository, crypto)

/* fixtures */
const userFixtures = require('scr/test/fixtures/user-fixtures')

describe('FEATURE: validate user password', () => {
  describe('SCENARIO: password ok - @unit', () => {
    describe('GIVEN a valid user already registred', () => {
      userRepository.findById = (id, callback) => {
        callback(null, userFixtures.registred())
      }

      describe('WHEN validate user password', () => {
        const password = 'fidelio'
        const userId = '1'
        validateUserPassword.execute(userId, password, (error, result) => {
          it('should return true', () => {
            expect(error).to.be.null
            expect(result).to.be.true
          })
        })
      })
    })
  })

  describe('SCENARIO: password not ok - @unit', () => {
    describe('GIVEN a valid user already registred', () => {
      userRepository.findById = (id, callback) => {
        callback(null, userFixtures.registred())
      }

      describe('WHEN validate user password', () => {
        const password = 'fideliowrong'
        const userId = '1'
        validateUserPassword.execute(userId, password, (error, result) => {
          it('THEN should return false', () => {
            expect(error.errors).to.have.deep.members([{
              message: 'password do not match'
            }])
            expect(result).to.be.false
          })
        })
      })
    })
  })

  describe('SCENARIO: user not found - @unit', () => {
    describe('GIVEN a valid user not registred', () => {
      userRepository.findById = (id, callback) => {
        callback({
          errors: [{
            message: 'user not found'
          }]
        })
      }

      describe('WHEN validate user password', () => {
        const password = 'fideliowrong'
        const userId = '1'
        validateUserPassword.execute(userId, password, (error, result) => {
          it('THEN should return false', () => {
            expect(error.errors).to.have.deep.members([{
              message: 'user not found'
            }])
            expect(result).to.be.undefined
          })
        })
      })
    })
  })
})
