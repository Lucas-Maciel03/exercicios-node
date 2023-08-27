const Tought = require('../models/Tought')
const User = require('../models/User')

const {Op} = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res){

        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where:{
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({plain: true}))
        //get vai jogar os dados de tought e user no mesmo array
              
        toughts.map((tought) => {
            const rawDate = tought.createdAt
            const formattedDate = new Date(rawDate).toLocaleString('pt-BR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
            })
            const formattedTime = new Date(rawDate).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            })
            tought.createdAt = `${formattedDate} - ${formattedTime}`;
        })
          
        let toughtsQty = toughts.length

        if(toughtsQty === 0){
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {id: userId
            },
            include: Tought,
            plain: true
        })

        //check if user exists
        if(!user){
            res.redirect('/login')
        }
        //map() pode iterar e modificar os itens de um array
        const toughts = user.Toughts.map((result) => result.dataValues)
        /*result = cada um dos itens. A função acime está cortando tudo 
        e informando q o resultado é apenas o que tem em dataValues*/ 
        
        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userid 

        //para verificar se o proprio usuario quer remover seu pensamento
        try {
            await Tought.destroy({where: {id: id, UserId: UserId}})

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTought(req, res){
        const id = req.params.id

        const tought = await Tought.findOne({where: {id}, raw: true})

        res.render('toughts/update', {tought})
    }

    static async updateToughtSave(req, res){
        const id = req.body.id

        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, {where: {id}})

            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}