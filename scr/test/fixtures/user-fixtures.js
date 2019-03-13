const userFixtures = (() => {
  const valid = () => {
    return {
      name: 'william',
      email: 'william@ball.com',
      password: 'Fr1end!2018'
    }
  }

  const invalid = () => {
    return {
      name: '',
      email: '',
      password: null
    }
  }

  const registred = () => {
    return {
      name: 'william',
      email: 'william@ball.com',
      password: {
        salt: 'f42113743b947fa3',
        hash: 'c64b15c3dd680f018041e88515440955d5388593d05029eccf6dd20e77437601b72631bba018147574a9b8e6f83a40fbe700556cc8a999ae92ce48da4f464103'
      }
    }
  }

  return {
    valid: valid,
    invalid: invalid,
    registred: registred
  }
})()

module.exports = userFixtures
