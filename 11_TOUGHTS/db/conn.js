const {Sequelize} = require('sequelize') 

const sequelize = new Sequelize('toughts2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('conectado ao Banco!')
} catch (error) {
    console.log(`Não foi possivel conectar ${error}`)
}

module.exports = sequelize
