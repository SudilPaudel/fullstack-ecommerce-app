const express = require('express');

require("./db.config")
const Joi = require('joi')
const helmet = require("helmet")
const cors = require("cors")
const app = express();
//For preventing the server from un ethical users
    //throttle
        //Server's firewall
    //sanitization
    app.use(helmet())

    app.use(cors())

const mainRouter = require('./routing.config');
const router = express.Router();




//body parsers
app.use(express.json())//Body parser (converts the json payload to viewable response payload)
app.use(express.urlencoded({
    extended: true
}))//Body parser for url encoded


//Stattic Middleware;
app.use("/assets/image", express.static('./public/images/'))


router.get('/health', (req,res,next)=>{
    res.json({
        result: "Hello There",
        message: "Success OK",
        meta: null
    })
})

app.use(router)

app.use(mainRouter);

//404 route
app.use("/",(req,res, next)=>{
    next({code: 404, message: "Resource not Found" })
})

//error handeller middleware
app.use((error, req, res, next)=>{
    
    let statusCode = error.code || 500;
    let data = error.data || null;
    let message = error.message || "Internal server Error";

    if(error instanceof Joi.ValidationError){
        statusCode = 422;
        message= "Validation Failed";
        data = {};
        const errorDetail = error.details
        if(Array.isArray(errorDetail)){
            errorDetail.map((errorObj)=>{
                data[errorObj.context.label]= errorObj.message;
            })
        }
    }
    if(statusCode === 11000){
        statusCode = 400
        data= {}
        const fields = Object.keys(error.keyPattern)
        fields.map((fieldname)=>{
            data[fieldname]= fieldname+" should be unique"
        })
        message = "Validation Error"
    }
    
    res.status(statusCode).json({
        result: data,
        message: message,
        meta: null
    })
})


module.exports = app;


