const express = require('express')
const router = express.Router()
const toughtController = require('../controllers/ToughtController')

router.get('/', toughtController.showToughts)

module.exports = router
