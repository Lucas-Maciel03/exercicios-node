const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }, 
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean
        },
        user: Object, //armazenar informações do dono
        adopter: Object //armazenar informações do adotante
        }, { timestamps: true }, //cria colunas q aramazena horario de criação e atualização do dado 
    )
)

module.exports = Pet
