const express = require('express')
const app = express()

const port = 3000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next){
    req.authStatus = true

    if(req.authStatus == true){
        console.log('Está logado, pode continuar')
        next()
    } else {
        console.log('Não esta logado, faça login para continuar')
    }
}
//middleware é algo que pode ser executado entre a req do usuario e a resposta
app.use(checkAuth) //o middlewara pode ser executado atraves do método use no express

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, ()=>{
    console.log(`Listen in port ${port}`)
})