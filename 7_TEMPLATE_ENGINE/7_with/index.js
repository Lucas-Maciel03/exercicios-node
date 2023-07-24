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
    const palavra = 'Algum texto'
    const auth = true

    res.render('home', {user, palavra, auth})
})

app.get('/dashboard', (req, res) => {
    const items = ['Item A', 'Item B', 'Item C']
    res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender node.js',
        category: 'JavaScript',
        body: 'Neste artigo vc vai aprender node.js.....',
        comments: 4
    }

    res.render('blogpost', {post})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})