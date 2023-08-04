//O DataTypes da acesso à todos os tipos de dados que o banco possui
const {DataTypes} = require('sequelize')

const db = require('../db/conn')
//metodo .define, define o model 
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, //só não aceita valor null
    },
    occupation: {
        type: DataTypes.STRING,
        require: true //require não aceita nada que esteja vazio nem nulo
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = User