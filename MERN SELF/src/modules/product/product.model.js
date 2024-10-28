const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min : 2
    },slug: {
        type: String,
        unique: true
    },
    desription: String,
    summary:{
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        default: null
    }],
    price: {
        type: Number,
        min: 100,
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 90,
        default:  0
    },
    afterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brand',
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    isfeatured: {
        type: Boolean,
        default: false
    },
    sellerId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    images: [{
        type: String
    }],
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
},
{ 
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const productModel = mongoose.model("Product", ProductSchema)

module.exports = productModel