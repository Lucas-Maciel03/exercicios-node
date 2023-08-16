const Task = require('../models/Task')

module.exports = class taskController {
    static createTask(req, res){
        res.render('tasks/create')
    }

    static async createTaskSave(req, res){
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }
        //faz com que solicite o model do controller para fazer uma interação com o Banco 
        await Task.create(task)

        res.redirect('/tasks')
    }

    static async showTasks(req, res){
        const tasks = await Task.findAll({raw: true}) 

        res.render('tasks/all', {tasks})
    }
}