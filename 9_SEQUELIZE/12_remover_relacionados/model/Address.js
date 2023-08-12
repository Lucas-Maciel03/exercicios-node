const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    }
})

User.hasMany(Address) //um user tem varios endereços, mas um endereço pertence somente a 1 user
Address.belongsTo(User) //Endereço pertence a um usuario

module.exports = Address