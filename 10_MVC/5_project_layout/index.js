const express = require('express')
const exphbs = require('express-handlebars')

const Task = require('./models/Task')
const conn = require('./db/conn')
const tasksRoutes = require('./routes/tasksRoutes')

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use('/tasks', tasksRoutes)

conn.sync()
.then(app.listen(3000, () => console.log('Listen in port 3000')))
.catch(err => console.log(err))