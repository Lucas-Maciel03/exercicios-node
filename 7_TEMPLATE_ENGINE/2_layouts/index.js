const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    //enviando valores para a main
    res.locals.title = 'Handlebars';
    res.locals.userName = 'João da Silva';
    res.render('home')
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})