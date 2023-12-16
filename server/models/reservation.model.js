const mongoose = require('mongoose');
const { string } = require('prop-types');

const reservationSchema = new mongoose.Schema({
    carId :{
        type:string
    },
    startDate:{
type: Date
    },
    endDate:{
        type:Date
    },
    userId:{
        type:string
    }
});
module.exports = mongoose.model('Reservation',reservationSchema);