const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../middlewares/verify-token')

router.post('/create', verifyToken, PetController.create)

module.exports = router
