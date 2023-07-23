const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Maciel'
    }
    const palavra = 'Texto'
    const auth = true
    res.render('home', {user: user, palavra, auth})
})

app.get('/dashboard', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Maciel'
    }
    res.render('dashboard', {user})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})