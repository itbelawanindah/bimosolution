const express = require('express')
const authController = require('../controllers/AuthControllers')
const router = express.Router()

router.get('/signup',authController.signup_get)
router.post('/signup',authController.signup_post)
router.get('/login',authController.sign_get)
router.post('/login',authController.sign_post)
router.get('/logout',authController.logout)



module.exports = router