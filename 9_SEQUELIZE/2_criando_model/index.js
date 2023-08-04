const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const user = require('./models/User')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

conn.sync()
.then(app.listen(port, () => console.log(`Listen in port ${port}`)))
.catch(err => console.log(err))