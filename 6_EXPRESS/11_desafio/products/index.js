const express = require('express')
const router = express()

const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/list', (req, res) => {
    res.sendFile(`${basePath}/products.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    console.log(`Buscando pelo produto: ${id}`)
    
    res.sendFile(`${basePath}/productDetalhes.html`)
})

module.exports = router