const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
app.use(express.static('public'))

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books(title, pageqty) VALUES('${title}', '${pageqty}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        console.log('Dados adicionados com sucesso')
        res.redirect('/books')
    })
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'
    
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
        }

        const books = data
        console.log(books)

        res.render('books', {books})
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function(err){
    if(err){
        console.log(err)
        return
    }

    console.log('Conectado ao banco de dados')
    app.listen(port, () => console.log(`Listen in port ${port}`))
})