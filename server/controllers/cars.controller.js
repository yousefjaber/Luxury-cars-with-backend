const {validationResult} = require('express-validator');
const Car = require('../models/car.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllCars = asyncWrapper(async(req,res) => {
    const cars = await Car.find();
    res.json({status: httpStatusText.SUCCESS, data:{cars} });
})

const getCar = asyncWrapper(async(req,res,next) => {
    const car = await Car.findById(req.params.carId);
    if(!car){
        const error = appError.create('course not found',404,httpStatusText.FAIL)
        return next(error);
    }
    return res.json({status: httpStatusText.SUCCESS, data:{car}} );
})

const addCar = asyncWrapper(async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = appError.create(errors.array(),400,httpStatusText.FAIL)
        return next(err);
    }
    const newCar = new Car(req.body);

    await newCar.save();
    res.status(201).json({status: httpStatusText.SUCCESS,data: {car: newCar} })
})

const updateCar = asyncWrapper(async (req,res,next) =>{
    const carId = req.params.carId;
    const updateCar = await Car.updateOne({id:carId},{$set:{...req.body}});
    return res.status(200).json({status: httpStatusText.SUCCESS,data:{car: updatedCar}})
})
const deleteCar = asyncWrapper(async (req,res) => {
await Car.deleteOne ({_id: req.params.carId});
res.status(200).json({status: httpStatusText.SUCCESS,data: null});
})

module.exports ={
    getAllCars,
    getCar,
    addCar,
    updateCar,
    deleteCar
}