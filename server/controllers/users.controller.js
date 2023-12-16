const asyncWrapper = require("../middleware/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req,res) => {
    const users = await User.find();
    res.json({status: httpStatusText.SUCCESS, data: {users}});
})
const register = asyncWrapper(async(req,res,next) =>{
    const {firstName, lastName, email, password, role} = req.body;
    const oldUser = await User.findOne({email: email});

    if (oldUser){
        const error = appError.create('user already exists',400,httpStatusText.FAIL)
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,

      
    })
    const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
    newUser.token = token;
    await newUser.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser},token })
})

const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({email: email});

    if(!user) {
        const error = appError.create('user not found', 400, httpStatusText.FAIL)
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) {

       const token = await generateJWT({email: user.email, id: user._id, role: user.role});

        return res.json({ status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create('something wrong', 500, httpStatusText.ERROR)
        return next(error);
    }

})


module.exports = {
    getAllUsers,
    register,
    login
}