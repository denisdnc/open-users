const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

// Use case dependencies
const crypto = require('src/main/infrastructure/crypto.js')()
const userRepository = {}
const owasp = require('owasp-password-strength-test')
const validator = require('approvejs')
const validateUser = require('src/main/business-rules/validate-user')(validator, owasp)
// Use case to test
const createUser = require('src/main/business-rules/create-user')(validateUser, userRepository, crypto)
// Fixtures
const userFixtures = require('src/test/fixtures/user-fixtures')

describe('FEATURE: create user', () => {
  describe('SCENARIO: create user with success - @component', () => {
    describe('GIVEN a valid user', () => {
      const user = userFixtures.valid()
      describe('AND user repository returns success', () => {
        userRepository.create = (user, callback) => {
          expect(callback).to.be.a('function')
          expect(user).to.be.a('object')
          expect(user).to.have.property('name').to.be.equal('william')
          expect(user).to.have.property('email').to.be.equal('william@ball.com')
          expect(user).to.have.property('password').to.be.not.null
          expect(user).to.not.have.property('errors')
          callback(null, user)
        }
        describe('WHEN create user is executed', () => {
          createUser.execute(user, (errors, result) => {
            it('THEN should return the created user', () => {
              expect(result).to.have.property('name').to.be.equal('william')
              expect(result).to.have.property('email').to.be.equal('william@ball.com')
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

  describe('SCENARIO: validate mandatory parameters - @component', () => {
    describe('GIVEN an invalid user', () => {
      const user = userFixtures.invalid()
      describe('WHEN create user is executed', () => {
        createUser.execute(user, (error, result) => {
          it('THEN should return errors', () => {
            expect(error.errors).to.have.deep.members([{
              property: 'email',
              message: 'email is required'
            }, {
              property: 'email',
              message: 'email must be a valid email address'
            }, {
              property: 'password',
              message: 'password is required'
            }])
          })
          it('AND should return user', () => {
            expect(result).to.have.property('name').to.be.equal('')
            expect(result).to.have.property('email').to.be.equal('')
            expect(result).to.not.have.property('password')
          })
        })
      })
    })
  })

  describe('SCENARIO: validate password - @component', () => {
    describe('GIVEN a user with invalid password', () => {
      const user = userFixtures.valid()
      user.password = '1234567890'
      describe('WHEN create user is executed', () => {
        createUser.execute(user, (error, result) => {
          it('THEN should return errors', () => {
            expect(error.errors).to.have.deep.members([{
              property: 'password',
              message: 'The password must contain at least one lowercase letter.'
            }, {
              property: 'password',
              message: 'The password must contain at least one uppercase letter.'
            }, {
              property: 'password',
              message: 'The password must contain at least one special character.'
            }, {
              property: 'password',
              message: 'The password must contain at least one lowercase letter.'
            }, {
              property: 'password',
              message: 'The password must contain at least one uppercase letter.'
            }, {
              property: 'password',
              message: 'The password must contain at least one special character.'
            }])
          })
          it('AND should return user', () => {
            expect(result).to.have.property('name').to.be.equal('william')
            expect(result).to.have.property('email').to.be.equal('william@ball.com')
            expect(result).to.not.have.property('password')
          })
        })
      })
    })
  })

  describe('SCENARIO: fail to save user on repository - @component', () => {
    describe('GIVEN an valid user', () => {
      const user = userFixtures.valid()
      describe('AND user repository returns error', () => {
        userRepository.create = (user, callback) => {
          callback({}, user)
          return
        }
        describe('WHEN create user is executed', () => {
          createUser.execute(user, (errors, result) => {
            it('THEN should return errors', () => {
              expect(errors).to.have.deep.members([{
                messages: ['error creating user on database']
              }])
            })
            it('AND should return user', () => {
              expect(result).to.have.property('name').to.be.equal('william')
              expect(result).to.have.property('email').to.be.equal('william@ball.com')
              expect(result).to.not.have.property('password')
            })
          })
        })
      })
    })
  })
})
