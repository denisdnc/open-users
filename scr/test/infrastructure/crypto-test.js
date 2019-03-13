const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

const crypto = require('scr/main/infrastructure/crypto')()

describe('FEATURE: encrypt value', () => {
  describe('SCENARIO: encrypt value with success - @unit', () => {
    describe('GIVEN a value', () => {
      const value = 'fidelio'

      describe('WHEN generate hash', () => {
        const result = crypto.generateHash(value)

        it('THEN should match value', () => {
          expect(result.hash).to.be.equal(crypto.generateHash(value, result.salt).hash)
        })
      })
    })
  })
})
