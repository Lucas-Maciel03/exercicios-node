const fs = require('fs')

console.log('inicio')

fs.writeFile('arquivo.txt', 'ola', (err) => {
    setTimeout(function() {
        console.log('Arquivo criado')
    }, 1000);
})

console.log('fim')