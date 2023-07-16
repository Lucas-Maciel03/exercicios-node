const fs = require('fs')
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    const urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name

    if(!name){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'content-type' : 'text/html'})
            res.write(data)
            return res.end()
        })
    } else{
        const nameNewLine = name + ",\n" //\n ou \r para quebrar linhas
        //const nameNewLine = name + ",\r" -> \n ou \r para quebrar linhas. ", é um separador"

        fs.appendFile('arquivo.txt', nameNewLine, function(err, data){
            res.writeHead(302, {
                Location: '/',
            })
            return res.end()
        })
    }
})

server.listen(port, () =>{
    console.log(`Listen in port ${port}`)
})