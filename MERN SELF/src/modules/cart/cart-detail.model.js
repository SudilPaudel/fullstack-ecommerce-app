const { ref, required } = require('joi')
const mongoose = require('mongoose')
const orderModel = require("./order.model")

const CartDetailSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    orderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
        require: false,
        default: null
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        default: null
    },

    productDetail: {
        title: String,
        slig: String,
        price: Number,
        afterDiscount: Number,
        discount: Number
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
    amount: {
        type: Number
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status:{
        type: String,
        enum: ["pending","ordered","cancelled", "completed"],
        
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatededBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }

},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true 
})

const cartDetailModel = mongoose.model('CartDetail', CartDetailSchema)
module.exports = cartDetailModel