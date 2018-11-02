$(document).ready(() => {
  $.getJSON('/api/todos')
    .then(addTodos)

  $('#todoInput').keypress(event => {
    if (event.which == 13) {
      createTodo()
    }
  })

  $('.list').on('click', 'span', function(event) {
    event.stopPropagation()
    removeTodo($(this).parent())
  })

  $('.list').on('click', 'li', function() {
    updateTodo($(this))
  })
})

function addTodo(todo) {
  const newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`)
  newTodo.data('id', todo._id)
  newTodo.data('completed', todo.completed)
  if (todo.completed) {
    newTodo.addClass('done')
  }
  $('.list').append(newTodo)
}

function addTodos(todos) {
  todos.forEach(addTodo)
}

function createTodo() {
  const userInput = $('#todoInput').val()
  $.post('/api/todos', {
    name: userInput
  }).then(newTodo => {
    $('#todoInput').val('')
    addTodo(newTodo)
  }).catch(err => console.log(err))
}

function removeTodo(item) {
  const itemId = item.data('id')
  $.ajax({
    method: 'DELETE',
    url: `/api/todos/${itemId}`
  }).then(data => {
    item.remove()
  }).catch(err => console.log(err))
}

function updateTodo(item) {
  const itemId = item.data('id')
  const isDone = !item.data('completed')
  const updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: `/api/todos/${itemId}`,
    data: updateData
  }).then(updateTodo => {
    item.toggleClass('done')
    item.data('completed', isDone)
  })
}