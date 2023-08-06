const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')

const port = 3000
const app = express()

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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else {
        newsletter = false
    }

    console.log(req.body)

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/', async (req, res) => {
    
    const users = await User.findAll({raw: true})

    console.log(users)

    res.render('home', {users})
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id}}) //poderia passar mais parametros {id, name}

    res.render('userview', {user})
})

conn.sync()
.then(app.listen(port, () => console.log(`Listen in port ${port}`)))
.catch(err => console.log(err))