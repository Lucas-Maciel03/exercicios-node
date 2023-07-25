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

const products = [
    {
        name: 'TV',
        price: '3.999,00',
        description: 'Televisao 55 polegadas',
        id: '1'
    },
    {
        name: 'Smartphone',
        price: '1.800,00',
        description: 'Smartphone android marca x',
        id: '2'
    },
    {
        name: 'Console ultraX',
        price: '3.500,00',
        description: 'Console de ultima geração',
        id: '3'
    },
    {
        name: 'Blusa Azul',
        price: '52,00',
        description: 'Blusa azul tamanhos variados',
        id: '4'
    }
]

app.get('/', (req, res) => {
    res.render('home', {products})
})

app.get('/product/:id', (req, res) => {
    const product = products[parseInt(req.params.id) - 1]

    console.log(`Acessando a pagina do produto ${product.name}`)
    
    res.render('pageproduct', {product})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})