module.exports = () => {
  const MongoClient = require('mongodb').MongoClient
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017'

  const connect = (callback) => {
    MongoClient.connect(url, callback)
  }

  return {
    connect: connect
  }
}
