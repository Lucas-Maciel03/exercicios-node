const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/testemongoose2')
    console.log('Conectado ao MongoDB com mongoose!')
}

main().catch((err) => console.log(err))

module.exports = mongoose
