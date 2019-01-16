const { secretKey } = require('../env')
const jwt = require('jsonwebtoken')

exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded) {
        next()
      } else {
        res.status(401).json({
          message: 'Please log in first'
        })
      }
    })
  } catch (e) {
    res.status(401).json({
      message: 'Please log in first'
    })
  }
}

exports.ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded && decoded.userId === req.params.id) {
        next()
      } else {
        res.status(401).json({
          message: 'Unauthorized'
        })
      }
    })
  } catch (e) {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
}
