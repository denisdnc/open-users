const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

// Fixtures
const userFixtures = require('scr/test/fixtures/user-fixtures')

const PORT = process.env.EXPOSED_PORT || '3000'

describe('FEATURE: users endpoints', () => {

  beforeEach(function () {
    // TODO clear database
  });

  describe('SCENARIO: do POST /v1/users with http status 201 - @e2e', () => {
    describe('GIVEN an valid user payload', () => {
      const user = userFixtures.valid()
      describe('WHEN POST is executed', () => {
        it('THEN should respond with valid payload', (done) => {
          chai.request(`http://localhost:${PORT}`)
            .post('/v1/users')
            .set('Content-Type', 'application/json')
            .send(user)
            .end((err, res) => {
              if (err) return done(err)
              expect(res.body).to.have.property('_id').to.be.not.null
              expect(res.status).to.be.equal(201)
              expect(res.body).to.have.property('name').to.be.equal('william')
              expect(res.body).to.have.property('email').to.be.equal('william@ball.com')
              expect(res.body).to.have.property('createdAt')
              expect(res.body).to.not.have.property('password')
              done()
            })
        })
      })
    })
  })

  describe('SCENARIO: do GET /v1/users/{id} with http status 200 - @e2e', () => {
    let userId;
    describe('GIVEN an valid user payload', () => {
      const user = userFixtures.valid()
      it('THEN should create an valid user', (done) => {
        chai.request(`http://localhost:${PORT}`)
          .post('/v1/users')
          .set('Content-Type', 'application/json')
          .send(user)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.status).to.be.equal(201)
            userId = res.body._id
            done()
          })
      })
    })
    describe('WHEN GET is executed', () => {
      it('THEN should respond with valid payload', (done) => {
        chai.request(`http://localhost:${PORT}`)
          .get(`/v1/users/${userId}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) return done(err)
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('name').to.be.equal('william')
            expect(res.body).to.have.property('email').to.be.equal('william@ball.com')
            expect(res.body).to.have.property('createdAt')
            expect(res.body).to.not.have.property('password')
            done()
          })
      })
    })
  })

  describe('SCENARIO: do POST /v1/users/{id}/password/valid with http status 200 - @e2e', () => {
    let userId;
    describe('GIVEN an valid user payload', () => {
      const user = userFixtures.valid()
      it('THEN should create an valid user', (done) => {
        chai.request(`http://localhost:${PORT}`)
          .post('/v1/users')
          .set('Content-Type', 'application/json')
          .send(user)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.status).to.be.equal(201)
            userId = res.body._id
            done()
          })
      })
    })
    describe('GIVEN a valid password payload', () => {
      const payload = {
        value: 'Fr1end!2018'
      }
      describe('WHEN POST is executed', () => {
        it('THEN should respond with valid payload', (done) => {
          chai.request(`http://localhost:${PORT}`)
            .post(`/v1/users/${userId}/password/valid`)
            .set('Accept', 'application/json')
            .send(payload)
            .end((err, res) => {
              if (err) return done(err)
              expect(res.status).to.be.equal(200)
              expect(res.body).to.have.property('valid').to.be.true
              done()
            })
        })
      })
    })
  })

  describe('SCENARIO: do PUT /v1/users/{id} with http status 200 - @e2e', () => {
    let userId;
    describe('GIVEN an valid user payload', () => {
      const user = userFixtures.valid()
      it('THEN should create an valid user', (done) => {
        chai.request(`http://localhost:${PORT}`)
          .post('/v1/users')
          .set('Content-Type', 'application/json')
          .send(user)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.status).to.be.equal(201)
            userId = res.body._id
            done()
          })
      })
    })
    describe('GIVEN a valid user payload', () => {
      const payload = {
        name: 'Jack Daniels',
        email: 'jack@daniels.com',
        password: 'N3wP4ssw0rd!'
      }
      describe('WHEN PUT is executed', () => {
        it('THEN should respond with valid payload', (done) => {
          chai.request(`http://localhost:${PORT}`)
            .put(`/v1/users/${userId}`)
            .set('Accept', 'application/json')
            .send(payload)
            .end((err, res) => {
              if (err) return done(err)
              expect(res.status).to.be.equal(200)
              expect(res.body).to.have.property('name').to.be.equals('Jack Daniels')
              expect(res.body).to.have.property('email').to.be.equals('jack@daniels.com')
              expect(res.body).to.have.property('createdAt')
              expect(res.body).to.not.have.property('password')
              done()
            })
        })
      })
    })
  })

})
