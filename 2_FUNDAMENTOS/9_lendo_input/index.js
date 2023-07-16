const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual a sua linguagem preferida? ", (language) =>{
    if(language = "css"){
        console.log("Isso nem é linguagem de programação")
    } else{
        console.log(`A minha linguagem preferida é ${language}`)
    }
    readline.close()
})
