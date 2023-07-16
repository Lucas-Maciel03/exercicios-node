const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a primeira nota?',
    },
    {
        name: 'p2',
        message: 'Qual a segunda nota',
    }
]).then((answers)=> {
    console.log(answers)
    const media = (parseInt(answers.p1) + parseInt(answers.p2)) / 2
    if(media >= 7 && media <= 10){
        console.log(`Aprovado, média ${media}`)
    } else if(media < 7) {
        console.log(`Reprovado, média ${media}`)
    } else{
        console.log(`Média invalida!`)
    }
})
.catch((err) => console.log(err))