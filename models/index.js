const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.connect(require('../env').mongodbUri)

mongoose.Promise = Promise

module.exports.Todo = require('./todo')
module.exports.User = require('./user')