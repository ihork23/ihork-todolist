const db = require('../models')

exports.getTodos = (req, res) => {
  db.Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err))
}

exports.createTodo = (req, res) => {
  const newTodo = Object.assign(
    {},
    req.body,
    { userId: req.params.id }
  )
  db.Todo.create(newTodo)
    .then(newTodo => {
      db.User.findById(newTodo.userId).then(user => {
        user.todos.push(newTodo._id)
        user.save().then(() => {
          return res.status(201).json(newTodo)
        })
      })
    })
    .catch(err => res.send(err))
}

exports.getTodo = (req, res) => {
  db.Todo.findById(req.params.todoId)
    .then(foundTodo => res.json(foundTodo))
    .catch(err => res.send(err))
}

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(todo => res.json(todo))
}

exports.deleteTodo = (req, res) => {
  db.Todo.remove({_id: req.params.todoId})
    .then(() => res.json({message: 'The item was deleted'}))
    .catch(err => res.send(err))
}

module.exports = exports