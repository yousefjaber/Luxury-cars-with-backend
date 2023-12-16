const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars.controller');
// const { validationSchema } = require('../middleware/validationSchema');
const verifyToken = require('../middleware/verifyToken.js');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');


router.route('/')
                .get(carController.getAllCars)
                .post(verifyToken,allowedTo(userRoles.ADMIN),carController.addCar);


router.route('/carId')
                .get(carController.getCar)
                .patch(carController.updateCar)
                .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER), carController.deleteCar);

 module.exports = router ;