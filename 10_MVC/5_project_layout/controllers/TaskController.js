const Task = require('../models/Task')

module.exports = class taskController {
    static createTask(req, res){
        res.render('tasks/create')
    }

    static showTasks(req, res){
        res.render('tasks/all')
    }
}
