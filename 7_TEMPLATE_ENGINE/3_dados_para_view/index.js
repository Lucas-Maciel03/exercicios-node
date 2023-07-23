const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    const user = {
        name: 'Lucas',
        surname: 'Maciel', 
        age: 21
    }
    const tema = 'parte 2'
    res.render('home', {user: user, tema})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})