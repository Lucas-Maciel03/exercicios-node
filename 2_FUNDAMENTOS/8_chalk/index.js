const chalk = require('chalk')


const args = process.argv.slice(2)
const nota = args[0].split("=")[1]

if(nota >=7){
    console.log(chalk.green(`Parabens sua nota foi ${nota}, você foi aprovado!`))
} else{
    console.log(chalk.bgRed.bold(`Sua nota é ${nota}, você está de recuperação!`))
}