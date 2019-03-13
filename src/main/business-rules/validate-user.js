module.exports = (validator, owasp) => {
  const validate = (errors, property, rules) => {
    const result = validator.value(property, rules)

    if (!result.approved) {
      result.errors.forEach(error => {
        errors.push({
          property: rules.title,
          message: error
        })
      })
    }
  }

  const execute = (user) => {
    const errors = []

    validate(errors, user, {
      title: 'user',
      required: true
    })

    validate(errors, user.email, {
      title: 'email',
      required: true,
      email: true
    })

    validate(errors, user.password, {
      title: 'password',
      required: true
    })

    if (errors.length === 0) {
      const result = owasp.test(user.password)
      let passwordErrors = result.errors.concat(result.optionalTestErrors)

      if (result.errors.length > 0) {
        passwordErrors.forEach((error) => {
          errors.push({
            property: 'password',
            message: error
          })
        })
      }
    }

    return errors
  }

  return {
    execute: execute
  }
}
