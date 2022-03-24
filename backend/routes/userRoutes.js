const express = require('express')
const router = express.Router()
const {register,login,getMe,getUser} = require('../controllers/userController.js')
const {protect} = require('../middleware/authMiddleware.js')

router.post('/',register)
router.post('/login',login)
router.get('/me',protect, getMe)
router.get('/:id', protect, getUser)


module.exports = router