const productRoute = require('express').Router()
const productCtrl = require('./product.controller')
const { bodyValidator } = require('../../middleware/validator.middleware')
const { setPath, uploader } = require('../../middleware/uploader.middleware')
const auth = require('../../middleware/auth.middleware')
const { productCreateDTO, productUpadateDTO } = require('./product.dto')
const allowRole = require('../../middleware/rbac.middleware')

productRoute.get('/home-list', productCtrl.listForHome)
productRoute.get("/:slug/detail", productCtrl.getProductDetailBySlug)
productRoute.route("/")
    .post(auth, allowRole(['admin','seller']) ,setPath('products'),uploader.array('images'),bodyValidator(productCreateDTO), productCtrl.createProduct)
    .get(auth, allowRole(['admin','seller']), productCtrl.productList)

productRoute.route('/:id')
    .get(auth, allowRole(['admin','seller']), productCtrl.showById)
    .put(
        auth, 
        allowRole(['admin','seller']), 
        setPath("products"),
        uploader.array('images'), 
        bodyValidator(productUpadateDTO, ['images']),
        productCtrl.update
    )
    .delete(
        auth, 
        allowRole(['admin','seller']),
        productCtrl.delete
    )
module.exports = productRoute