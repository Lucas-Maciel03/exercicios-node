const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')

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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    //async é para deixar a função assincrona
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else{
        newsletter = false
    }

    console.log(req.body)
    //await é para esperar a criação do usuario para poder redirecionar
    await User.create({name, occupation, newsletter})

    res.redirect('/')    
})

app.get('/', (req, res) => {
    res.render('home')
})

conn.sync()
.then(app.listen(port, () => console.log(`Listen in port ${port}`)))
.catch(err => console.log(err))