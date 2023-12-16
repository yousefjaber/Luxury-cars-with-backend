
const express = require('express');
const cors = require('cors');
const app = express();
const httpStatusText = require('./utils/httpStatusText')
const carsRouter = require('./routes/cars.routes')
const usersRouter = require('./routes/users.routes');
const connectDb = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT || 3000;

connectDb();
app.use(cors())
app.use(express.json());

app.use('/api/cars',carsRouter)
app.use('/api/users', usersRouter)

app.all('*', (req,res,next) => {
    return res.status(404).json({status: httpStatusText.Error, message:'this resource is not available'  })
})
app.use((error,req,res,next) =>{
    res.status(error.statusCode || 500).json({status: error.statusText ||httpStatusText.Error,message: error.message, data: null});
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


