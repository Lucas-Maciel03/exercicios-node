const path = require('path')

const customPath = '/relatorios/pasta1/novo/testes.docx'

console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))