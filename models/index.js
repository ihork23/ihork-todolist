const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect(process.env.MONGODB_URI || require('../dev.env').mongodbUri)

mongoose.Promise = Promise

module.exports.Todo = require('./todo')
module.exports.User = require('./user')