const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'nome',
        message: 'Qual seu nome?',
    },
    {
        name: 'idade',
        message: 'qual sua idade?',
    }
]).then((answers) => {
    
    if(!answers.nome || !answers.idade){
        throw new Error('O nome e a idade sao obrigatorios!')
    }
    
    console.log(chalk.bgYellow.black(`O nome do Usuario é ${answers.nome} e ele tem ${answers.idade} anos de idade!`))

}).catch((err) => console.log(err))

