const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        const auth = true
        res.render('auth/login', {auth})
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        //find user
        const user = await User.findOne({where: {email: email}})

        if(!user){
            const auth = true
            req.flash('message', 'O login não existe, tente novamente!')
            res.render('auth/login', {auth})

            return
        }
        //check if password match
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            const auth = false
            req.flash('message', 'A senha está incorreta, tente novamente!')
            res.render('auth/login', {email, password, auth})

            return
        }

        //session
        req.session.userid = user.id

        req.flash('message', 'Login realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })

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

        //check if user exists
        const checkIfUserExists = await User.findOne({where:{email: email}})
        if(checkIfUserExists){
            const auth = false
            req.flash('message', 'O e-mail já está em uso, tente novamente!')
            res.render('auth/register', {name, email, password, confirmpassword, auth})

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10) //para dificultar caso a senha seja hackeada
        const hashedPassword = bcrypt.hashSync(password, salt) //vai gerar uma hash com salt e senha

        const user = {
            name,
            email, 
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)
            
            //initialize session
            req.session.userid = createdUser.id //esta comunicando q user fez registro com sucesso
            
            req.flash('message', 'Cadastro realizado com sucesso')

            req.session.save(() => {
                res.redirect('/')
            }) //está salvando a sessão para continuar mesmo recarregando a pagina

        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
}