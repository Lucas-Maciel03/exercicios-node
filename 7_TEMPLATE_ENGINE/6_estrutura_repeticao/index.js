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
    const palavra = 'Texto aqui'
    const auth = true

    res.render('home', {user, palavra, auth})
})

app.get('/dashboard', (req, res) => {
    const items = ['Item A', 'Item B', 'Item C']
    res.render('dashboard', {items})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})