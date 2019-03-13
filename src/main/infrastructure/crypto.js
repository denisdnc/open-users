module.exports = () => {
  const crypto = require('crypto')

  const generateSalt = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0, length) /** return required number of characters */
  }

  const generateHash = (value, salt) => {
    if (!salt) {
      salt = generateSalt(16)
    }

    return {
      salt: salt,
      hash: crypto.createHmac('sha512', salt)
        .update(value)
        .digest('hex')
    }
  }

  return {
    generateHash: generateHash
  }
}
