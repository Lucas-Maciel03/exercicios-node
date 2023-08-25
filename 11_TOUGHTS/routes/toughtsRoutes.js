const express = require('express')
const router = express.Router()
const toughtController = require('../controllers/ToughtController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, toughtController.createTought)
router.post('/add', checkAuth, toughtController.createToughtSave)
router.get('/dashboard', checkAuth, toughtController.dashboard)
router.get('/', toughtController.showToughts)

module.exports = router
