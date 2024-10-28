
const mainRouter = require("express").Router()

//routes import 
const authRouter = require('../modules/auth/auth.router');
const bannerRouter = require("../modules/banners/banner.router");
const brandRouter = require("../modules/brand/brand.router");
const cartRouter = require("../modules/cart/cart.router");
const categoryRoute = require("../modules/category/category.router");
const productRouter = require("../modules/product/product.router");
const userRouter = require("../modules/user/user.router")


mainRouter.use('/auth',authRouter);
mainRouter.use('/user',userRouter);
mainRouter.use('/banner',bannerRouter)
mainRouter.use('/brand', brandRouter)
mainRouter.use('/category', categoryRoute)
mainRouter.use('/product', productRouter)
mainRouter.use('/order', cartRouter)





module.exports = mainRouter;