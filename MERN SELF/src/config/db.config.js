require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: process.env.MONGO_DB_NAME
}).then(()=>{
    console.log("Mongo DB connected successfully...")
}).catch((err)=>{
    console.log("Error while connecting Mongo DB.....")
    process.exit(1)
})