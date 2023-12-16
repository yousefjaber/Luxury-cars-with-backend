const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image: {
        type : String,
        required: true,
    },
    type: {
        type: String,
    },
    company: {
        type: String,
    },
    available:{
        type:Boolean,
    }
})

module.exports = mongoose.model('Car',carSchema);
