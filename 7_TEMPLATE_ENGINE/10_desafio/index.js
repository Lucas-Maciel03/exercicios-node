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
    const products = [
        {
            name: 'TV',
            price: '3.999,00',
            description: 'Televisao 55 polegadas',
            link: '/televisao'
        },
        {
            name: 'Smartphone',
            price: '1.800,00',
            description: 'Smartphone android marca x',
            link: '/smartphone'
        },
        {
            name: 'Console ultraX',
            price: '3.500,00',
            description: 'Console de ultima geração',
            link: '/ultrax'
        },
        {
            name: 'Blusa Azul',
            price: '52,00',
            description: 'Blusa azul tamanhos variados',
            link: '/blusa'
        }
    ]

    res.render('home', {products})
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})