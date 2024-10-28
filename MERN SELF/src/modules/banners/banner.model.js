const mongoose = require('mongoose')
const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 3
    },
    link: {
        type: String
    },
    status:{
        type: String,
        enum: ["active","inactive"],
        default: "inactive"
    },
    image: {
        type: String,
        require: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
},
{ 
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const bannerModel = mongoose.model("Banner", BannerSchema)

module.exports = bannerModel