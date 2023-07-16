const fs = require('fs') //file system - importando o modulo file system

fs.readFile('arquisvo.txt', 'utf-8', (err, data) =>{
    if(err){
        console.log(err)
        return
    }
    console.log(data)
})
