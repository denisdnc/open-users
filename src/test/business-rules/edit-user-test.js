const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

// component dependencies
const crypto = require('src/main/infrastructure/crypto.js')()
const userRepository = {}
// component to test
const editUser = require('src/main/business-rules/edit-user')(userRepository, crypto)
// Fixtures
const userFixtures = require('src/test/fixtures/user-fixtures')

describe('FEATURE: edit user', () => {

  describe('SCENARIO: edit user with success - @component', () => {
    describe('GIVEN a user already registred', () => {
      userRepository.findById = (id, callback) => {
        callback(null, userFixtures.registred())
      }
      describe('AND a valid response from repository update', () => {
        userRepository.update = (user, callback) => {
          expect(user).to.have.property('name').to.be.equal('Jack Daniels')
          expect(user).to.have.property('email').to.be.equal('jack@daniels.com')
          expect(user).to.have.property('password').to.be.not.equals('N3wP4ssw0rd!')
          expect(user.password).to.have.property('salt')
          expect(user.password).to.have.property('hash')
          callback(null, user)
        }
        describe('WHEN edit user', () => {
          const newUserInfo = {
            name: 'Jack Daniels',
            email: 'jack@daniels.com',
            password: 'N3wP4ssw0rd!'
          }
          editUser.execute(newUserInfo, (errors, result) => {
            it('THEN should return the edited user', () => {
              expect(result).to.have.property('name').to.be.equal('Jack Daniels')
              expect(result).to.have.property('email').to.be.equal('jack@daniels.com')
              expect(result).to.not.have.property('password')
            })
            it('AND should have no errors', () => {
              expect(errors).to.be.null
            })
          })
        })
      })
    })
  })

  describe('SCENARIO: user not found - @component', () => {
    describe('GIVEN a user not registred', () => {
      userRepository.findById = (id, callback) => {
        callback(null, null)
      }
      describe('WHEN edit user', () => {
        const newUserInfo = {
          name: 'Jack Daniels',
          email: 'jack@daniels.com',
          password: 'N3wP4ssw0rd!'
        }
        editUser.execute(newUserInfo, (error, result) => {
          it('THEN should return error', () => {
            expect(result).to.be.undefined
            expect(error).to.be.not.null
            expect(error.errors).to.be.have.deep.members([{
              message: 'user not found'
            }])
          })
        })
      })
    })
  })

})