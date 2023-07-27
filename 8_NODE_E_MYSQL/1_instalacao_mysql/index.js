const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()
const port = 3000

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

//a conexão está sendo criada mas nao está sendo executada
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//conenctando ao banco
conn.connect(function(err){
    if(err){
        console.log(err)
    }

    console.log(`Conectou ao mysql`)
    
    app.listen(port, () => console.log(`Listen in port 3000`))
})
