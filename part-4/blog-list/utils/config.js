require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let SECRET = process.env.MONGODB_URI || '12345678'

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}
