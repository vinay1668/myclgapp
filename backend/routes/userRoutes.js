const express = require('express')
const router = express.Router()
const {register,login,getMe,getUser,getAllUsers,updateDes} = require('../controllers/userController.js')
const {protect} = require('../middleware/authMiddleware.js')

router.get('/searchuser', protect,getAllUsers);

router.post('/',register)
router.post('/login',login)
router.get('/me',protect, getMe)
router.post('/otheruser', protect, getUser)
router.put('/updatedes',protect,updateDes)

module.exports = router