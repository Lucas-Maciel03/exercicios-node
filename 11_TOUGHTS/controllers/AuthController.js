const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }

    static register(req, res){
        const auth = true
        res.render('auth/register', {auth})
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body

        //password match validation
        if(password != confirmpassword){
            const auth = false
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register', {name, email, password, confirmpassword, auth})

            return
        }

        res.redirect('/')
    }
}