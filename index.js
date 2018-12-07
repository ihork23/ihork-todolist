const express = require('express')
const app = express()
const port = require('./env').port
const bodyParser = require('body-parser')

const todoRoutes = require('./routes/todos')
const authRoutes = require('./routes/auth')

const auth = require('./middlewares/auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/views`))
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) =>
  res.send('index.html')
)

app.use('/api/users/:id/todos', auth.loginRequired, todoRoutes)
app.use('/api/auth', authRoutes)
app.listen(port, () => {
  console.log('App is running on port', port)
})