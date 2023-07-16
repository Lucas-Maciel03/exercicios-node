const path = require('path')

//path absoluto
console.log(path.resolve('teste.txt'))

//formar path 
const midFolder = 'documentos'
const fileName = 'arquivoNovo.pdf'

const finalPath = path.join('/', 'explorer', midFolder, fileName) 

console.log(finalPath)