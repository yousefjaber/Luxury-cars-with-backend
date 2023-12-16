const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js')
const verifyToken = require('../middleware/verifyToken.js');
const appError = require('../utils/appError');


router.route('/')
            .get(verifyToken, userController.getAllUsers)

router.route('/register')
            .post(userController.register)

router.route('/login')
            .post(userController.login)

module.exports = router;
