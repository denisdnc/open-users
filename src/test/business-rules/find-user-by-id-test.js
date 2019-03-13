const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

// dependencies
const userRepository = {}
// component test
const findUserById = require('src/main/business-rules/find-user-by-id')(userRepository)
// fixtures
const userFixtures = require('src/test/fixtures/user-fixtures')

describe('FEATURE: find user by id', () => {

  describe('SCENARIO: find with success - @unit', () => {
    describe('GIVEN a user already registred', () => {
      userRepository.findById = (id, callback) => {
        callback(null, userFixtures.registred())
      }

      describe('WHEN find user by id', () => {
        findUserById.execute('id', (error, user) => {
          it('THEN should return user with no errors', () => {
            expect(error).to.be.null
            expect(user).to.be.not.null
            expect(user).to.have.property('name')
            expect(user).to.have.property('email')
            expect(user).to.have.not.property('password')
          })
        })
      })
    })
  })

  describe('SCENARIO: user not found - @unit', () => {
    describe('GIVEN a user not registred', () => {
      userRepository.findById = (id, callback) => {
        callback(null, null)
      }

      describe('WHEN find user by id', () => {
        findUserById.execute('id', (error, user) => {
          it('THEN should return errors', () => {
            expect(error).to.be.not.null
            expect(error.errors).to.have.deep.members([{
              message: 'user not found'
            }])
            expect(user).to.be.undefined
          })
        })
      })
    })
  })

  describe('SCENARIO: repository error - @unit', () => {
    describe('GIVEN an error on repository', () => {
      userRepository.findById = (id, callback) => {
        callback({
          errors: [{
            message: 'error finding user'
          }]
        })
      }

      describe('WHEN find user by id', () => {
        findUserById.execute('id', (error, user) => {
          it('THEN should return errors', () => {
            expect(error).to.be.not.null
            expect(error.errors).to.have.deep.members([{
              message: 'error finding user'
            }])
            expect(user).to.be.undefined
          })
        })
      })
    })
  })

})
