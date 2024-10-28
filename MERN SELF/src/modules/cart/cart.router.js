const cartRouter = require('express').Router()
const auth = require('../../middleware/auth.middleware')
const allowRole = require('../../middleware/rbac.middleware')
const { bodyValidator } = require('../../middleware/validator.middleware')
const cartCtrl = require('./cart-detail.controller')
const { AddToCartDTO, PlaceOrderDTO } = require('./cart-detail.dto')


cartRouter.post("/add-to-cart", auth, allowRole(["admin","customer"]), bodyValidator(AddToCartDTO), cartCtrl.addToCart)
cartRouter.get("/my-cart-list", auth, cartCtrl.listCart)
cartRouter.post("/place-order", auth, allowRole(["admin","customer"]), bodyValidator(PlaceOrderDTO), cartCtrl.placeOrder)
cartRouter.get("/my-orders", auth, allowRole(["admin","customer"]), cartCtrl.listMyOrder)
cartRouter.get("/my-orders-lists", auth, allowRole(["seller"]), cartCtrl.myOrderList)
cartRouter.get("/order-complete/:id", auth, allowRole(["admin"]), cartCtrl.updateOrderStatus)
module.exports = cartRouter