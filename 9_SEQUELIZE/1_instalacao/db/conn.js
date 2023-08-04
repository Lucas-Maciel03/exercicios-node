const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('concetamos com sucesso com o sequelize')
} catch(err){
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize