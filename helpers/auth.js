const db = require('../models')
const jwt = require('jsonwebtoken')
const secretKey = require('../env').secretKey

exports.signin = (req, res) => {
  const { email, password } = req.body
  db.User.findOne({ email })
    .then(user => {
      const { id, username, profileImageUrl } = user
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ userId: id }, secretKey)
          res.status(200).json({
            userId: id,
            username,
            profileImageUrl,
            token
          })
        } else {
          res.status(400).json({
            message: 'Invalid Email/Password'
          })
        }
      })
    })
    .catch(err =>
      res.status(400).json({
        message: 'Invalid Email/Password'
      })
    )
}

exports.signup = (req, res, next) => {
  db.User.create(req.body)
    .then(({ id, username, profileImageUrl }) => {
      const token = jwt.sign({ userId: id }, secretKey)
      res.status(200).json({
        userId: id,
        username,
        profileImageUrl,
        token
      })
    })
    .catch(err => res.status(400).json(err))
}

module.exports = exports
