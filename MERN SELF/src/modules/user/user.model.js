
const mongoose = require("mongoose");
// seperate schema for address as 2 of the attribute shares the same schema 
const AddressSchema = new mongoose.Schema({
    houseNo: String,
    streetName: String,
    province: String,
    district: String

})

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["seller","customer", "admin"],
        default: "customer"
    },
    activationToken:{
        type: String
    },
    status:{
        type: String,
        enum: ["active","inactive"],
        default: "inactive"
    },
    phone:{
        type: String
    },
    image: String,
    address:{
        shippingAddress:AddressSchema,
        billingAddress:AddressSchema
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
},
{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
}
)

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;