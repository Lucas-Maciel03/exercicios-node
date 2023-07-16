const fs = require('fs')

if(!fs.existsSync('./newFolder')){
    fs.mkdirSync('newFolder')
    console.log('Não existe!')
} else if(fs.existsSync('./newFolder')){
    console.log('Existe!')
}