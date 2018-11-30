const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
})

userSchema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10)
    .then(hashedPassword => {
      user.password = hashedPassword
      next()
    }, err => next(err))
})

userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err)
    next(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User