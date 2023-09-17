const jwt = require('jsonwebtoken')

module.exports = async function createUserToken(user, req, res){
    
    //create a token
    const token = jwt.sign({
        /*o que será enviado com o token
        alem do token tbm tem metadados q podem ser usados p validar algo*/
        name: user.name,
        id: user._id
    }, 'secretapenasumteste') //secret uma forma de deixar o token unico

    //return token
    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
    })

} 