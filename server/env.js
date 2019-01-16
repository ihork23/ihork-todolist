const devEnv = require('./dev.env')

const { MONGODB_URI, SECRET_KEY, PORT } = process.env

module.exports = Object.assign(
  {},
  devEnv,
  {
    mongodbUri: MONGODB_URI || devEnv.mongodbUri,
    secretKey: SECRET_KEY || devEnv.secretKey,
    port: PORT || devEnv.port
  }
)