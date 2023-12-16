const express = require('express');
const router = express.Router();


router.route('/reservation')
                .post(reservationController)


  module.exports = router;