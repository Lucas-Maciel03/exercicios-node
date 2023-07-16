const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.write('oi http') //esta dando uma resposta ao usuario
    res.end()
})

server.listen(port, () =>{
    console.log(`servidor rodando na porta: ${port}`)
})