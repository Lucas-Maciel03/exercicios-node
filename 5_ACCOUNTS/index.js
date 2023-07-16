//modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulos internos
const fs = require('fs')

operation()

function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: ['Criar conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'],
        },
    ])
    .then((answer)=>{
        const action = answer['action']
        
        if(action === 'Criar conta'){
            createAccount()
        } else if(action === 'Consultar Saldo'){
            getAcountBalance()
        } else if(action === 'Depositar'){
            deposit()
        } else if(action === 'Sacar'){
            withDraw()
        } else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }
    })
    .catch((err => console.log(err)))
}

//criar conta
function createAccount(){
    console.log(chalk.bgGreen.black('Obrigado por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']
        
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(
                chalk.bgRed.black('Essa conta já existe, escolha outro nome!')
            )
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance":0}', 
            function(err){console.log(err)},
        )

        console.log(chalk.green('Parabéns, sua conta foi criada com sucesso'))

        operation()
    })
    .catch(err => console.log(err))
}

//add deposito na conta do usuario
function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']
        
        //checar se o nome da conta existe
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual o valor de deposito?'
            }
        ]).then((answer) =>{
            const amount = answer['amount']

            //add an amount
            addAmmount(accountName, amount)
            //operation()

        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Nome da conta não existe, tente novamente'))
        return false
    }
    return true
}

function addAmmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount || amount < 0){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    //alterando valor do objeto
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    //salvando alteração no arquivo
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
    operation()
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r',
    })

    return JSON.parse(accountJSON)
}

//consultar saldo

function getAcountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return getAcountBalance()
        }

        accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`O saldo da sua conta é R$${accountData.balance}`))

        operation()

    }).catch(err => console.log(err))
}

//withdraw an ammount from user account 
function withDraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }       
    ]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withDraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual valor do saque?'
            }
        ]).then((answer) =>{
            const amount = answer['amount']

            removeAmount(accountName, amount)
            //operation()
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return withDraw()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Você não tem esse saldo para saque!'))
        return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
        console.log(err)
    })

    console.log(chalk.green(`Foi realizado um saque de R$${amount} na sua conta!`))
    operation()
}