const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Maciel'
    }

    const palavra = 'Alguma coisa'
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

app.get('/blog', (req, res) => {
    const posts = [{
        title: 'Aprender node.js',
        category: 'JavaScript',
        body: 'Neste Artigo vc ira aprender node.js...',    
        comments: 4
    },
    {
        title: 'Aprender C#',
        category: 'C#',
        body: 'Neste Artigo vc ira aprender C#...',
        comments: 10
    },
    {
        title: 'Aprender PHP',
        category: 'PHP',
        body: 'Neste Artigo vc ira aprender PHP...',
        comments: 2
    },
    {
        title: 'Aprender Java',
        category: 'Java',
        body: 'Neste Artigo vc ira aprender Java...',
        comments: 7
    },
]

    res.render('blog', {posts})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})