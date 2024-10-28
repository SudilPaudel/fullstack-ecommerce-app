const productSvc = require("../product/product.service")
const cartSvc = require("./cart-detail.service")

class CartDetailController {
    addToCart = async (req, res, next) => {
        try {
            const { productId, quantity } = req.body
            const productDetail = await productSvc.findOne({
                _id: productId
            })
            const newCartObject = cartSvc.transformCartObject(productDetail, quantity, req.authUser)

            //existing
            //nonexisting
            const existing = await cartSvc.findOne({
                status: "pending",
                productId: productId,
                buyerId: req.authUser._id,
                orderId: null
            })

            if (existing) {
                //existing
                //update
                if (quantity <= 0) {
                    //remove 
                    const removed = await cartSvc.removeFromCartById(existing._id);
                    res.json({
                        result: removed,
                        message: "Cart Item removed successfully",
                        meta: null
                    })
                } else {
                    existing.quantity = quantity;
                    existing.productDetail.price = productDetail.price
                    existing.productDetail.discount = productDetail.discount
                    existing.productDetail.afterDiscount = productDetail.afterDiscount
                    existing.amount = productDetail.afterDiscount * quantity;

                    const update = await existing.save();
                    res.json({
                        result: existing,
                        message: "Cart Updated Successfully",
                        meta: null
                    })

                }
            } else {
                //store operation
                if (quantity >= 1) {
                    const cart = await cartSvc.createCart(newCartObject)
                    res.json({
                        result: cart,
                        message: "Product added in the cart",
                        meta: null
                    })
                } else {
                    throw { code: 422, message: 'Quantity should be always greater then or equal to 1 ' }
                }
            }
            //existing
            //update
            // non existing
            // create
        } catch (exception) {
            next(exception)
        }
    }
    listCart = async (req, res, next) => {
        try {
            const loggedInUsers = req.authUser
            let filter = {
                orderId: null
            }
            let cartItems = null
            //admin le khojeko
            if (loggedInUsers.role === "admin") {
                cartItems = await cartSvc.findAll(filter)
            } else if (loggedInUsers.role === "seller") {
                filter = {
                    ...filter,
                    sellerId: loggedInUsers._id,
                    sellerId: { $ne: null }
                }
                cartItems = await cartSvc.findAll(filter)
            } else if (loggedInUsers.role === "customer") {
                filter = {
                    ...filter,
                    buyerId: loggedInUsers._id,
                    buyerId: { $ne: null }
                }
                cartItems = await cartSvc.findAll(filter)
            }

            res.json({
                result: cartItems,
                message: "cart list",
                meta: null
            })
            //seller le khojeko
            //customer le khojeko

        } catch (exception) {
            next(exception)
        }
    }
    placeOrder = async (req, res, next) => {
        try {
            let { cartId, discount } = req.body
            if (cartId.length <= 0) {
                throw { code: 400, message: "Cart items required" }
            }
            //verify cart items of our own 
            const cartDetail = await cartSvc.findAll({
                buyerId: req.authUser._id,
                _id: { $in: [...cartId] },
                orderId: null,
                status: "pending"
            })
            let order = {
                buyerId: req.authUser._id,
                cartDetail: cartId,
                subTotal: 0,
                discountAmt: 0,
                discountPer: 0,
                deliveryCharge: 100,
                totalAmount: 0,
                isPaid: false,
                paymentMethod: "cod",
                status: "pending",
                createdBy: req.authUser._id,
            }
            if (!cartDetail) {
                throw { code: 400, message: " Cart Doesnot Exists Anymore" }
            }
            let subTotal = 0
            cartDetail.map((cartItem)=>{
                subTotal += +cartItem.amount
            })
            let discountAmount = subTotal * discount/100;
            let total = subTotal - discountAmount + order.deliveryCharge
            order.subTotal = subTotal
            order.discountPer = discount
            order.discountAmt = discountAmount
            order.totalAmount = total

            const orderDetail = await cartSvc.placeOrder(order, cartId)
            res.json({
                result: orderDetail,
                message: "Your Order Has been placed successfully",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }
    }
    listMyOrder= async(req,res,next)=>{
        try{
            const loggedInUser = req.authUser
            let filter = {}
            if(loggedInUser.role === "admin"){
                //fetch all 
                
            }else{
                filter = {
                    buyerId: loggedInUser._id
                }
            }

            if(req.query.status && ["pending", "confirmed", "cancelled", "delivered"].includes(req.query.status)){
                filter = {
                    ...filter,
                    status: req.qurey.status
                }
            }
            const orderData = await cartSvc.getOrderList(filter)
            res.json({
                result: orderData,
                message: "Your Orders",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    myOrderList = async(req, res, next)=>{
        try{
            const loggedInUser = req.authUser
            let filter ={
                sellerId: loggedInUser._id,
                sellerId: {$ne: null}
            }
            if(req.query.status && ["ordered", "cancelled", "completed"].includes(req.query.status)){
                filter = {
                    ...filter,
                    status: req.qurey.status
                }
            }
            const orders = await cartSvc.findAll(filter)
            res.json({
                result: orders,
                message: "orderList",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    updateOrderStatus = async(req,res,next)=>{
        try{
            const loggedInUser = req.authUser
            let updateStatus;
            if(loggedInUser.role === "seller"){
                updateStatus = await cartSvc.updateCartDetail({
                    _id: req.params.id,
                    sellerId: loggedInUser._id
                },{
                    status: "completed"
                })
            }else {
                updateStatus = await cartSvc.updateOrderDetail({
                    _id: re.params.id
                },{
                    status: "completed"
                })
            }
            res.json({
                result: updateStatus,
                messag: "Thank you for using our ecommerce. Please visit Again......"
            })
        }catch(exception){
            next(exception)
        }
    }
}

const cartCtrl = new CartDetailController()
module.exports = cartCtrl