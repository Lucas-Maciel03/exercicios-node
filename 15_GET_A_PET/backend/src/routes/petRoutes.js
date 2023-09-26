const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../middlewares/verify-token')
const { imageUpload } = require('../middlewares/image-upload')

router.post(
    '/create',
    verifyToken,
    imageUpload.array('images'),
    PetController.create
)
router.get('/', PetController.getPet)
router.get('/mypets', verifyToken, PetController.getAllUserPets)

module.exports = router
