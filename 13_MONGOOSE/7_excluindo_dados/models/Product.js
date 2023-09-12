const mongoose = require('mongoose')
const { Schema } = mongoose

//mongoose.model insere o schema 
const Product = mongoose.model(
    'Product', //nome do model
    new Schema({ //instancia um novo objeto schema q é a estrutura do model(campos da collection)
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    })
)

module.exports = Product
