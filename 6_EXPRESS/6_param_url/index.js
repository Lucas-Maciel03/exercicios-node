const express = require('express')
const app = express()

const port = 3000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    const users = req.params.id

    //leitura da tabela users, resgatar um usuario do banco
    console.log(`Buscando o usuario: ${users}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})