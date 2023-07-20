const express = require('express')
const app = express()
const port = 5000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

const products = require('./products') //

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/products', products)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})