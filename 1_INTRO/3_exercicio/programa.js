const fs = require('fs');

fs.writeFile("arquivo.txt", "novo texto add", (err) => {
    if(err){
        console.log(err)
        return
    } 
    console.log('texto adicionado com sucesso!')
})

fs.readFile("arquivo.txt", "utf-8", (err, data) => {
    if(err){
        console.log(err)
        return
    } 
    console.log(data)
})

fs.appendFile("arquivo.txt", ' criando nova mensagem', (err) =>{
    if(err){
        console.log(err)
        return
    }
    console.log('novo texto adicionado com sucesso')
})
