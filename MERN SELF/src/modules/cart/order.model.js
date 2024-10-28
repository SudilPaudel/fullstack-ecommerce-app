const mongoose = require('mongoose')
const cartDetailModel = require("./cart-detail.model")
const OrderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    cartDetail: [{
        type: mongoose.Types.ObjectId,
        ref: "CartDetail",
        default: null
    }],
    subTotal:{
        type:Number,
        require: true,
        min: 1
    },
    discountPer: {
        type:Number,
        min: 0,
        default: 0
    },
    discountAmt: {
        type:Number,
        min: 0,
        default: 0
    },
    deliveryCharge: {
        type:Number,
        min: 100,
        default: 100
    },
    totalAmount: {
        type:Number,
        min: 0,
        default: 0
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'online', 'bank','esewa'],
        default: 'cod'
    },
    status: {
        type: String,
        enum: ['pending','delivered','cancelled','confirmed'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true 
})
const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel