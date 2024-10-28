const brandRoute = require('express').Router()
const brandCtrl = require('./brand.controller')
const { bodyValidator } = require('../../middleware/validator.middleware')
const { setPath, uploader } = require('../../middleware/uploader.middleware')
const auth = require('../../middleware/auth.middleware')
const { brandCreateDTO, brandUpadateDTO } = require('./brand.dto')
const allowRole = require('../../middleware/rbac.middleware')

brandRoute.get('/home-list', brandCtrl.listForHome)
brandRoute.route("/")
    .post(auth, allowRole('admin') ,setPath('brands'),uploader.single('image'),bodyValidator(brandCreateDTO), brandCtrl.createBrand)
    .get(auth, allowRole('admin'), brandCtrl.brandList)

brandRoute.route('/:id')
    .get(auth, allowRole('admin'), brandCtrl.showById)
    .put(
        auth, 
        allowRole('admin'), 
        setPath("brands"),
        uploader.single('image'), 
        bodyValidator(brandUpadateDTO, ['image']),
        brandCtrl.update
    )
    .delete(
        auth, 
        allowRole('admin'),
        brandCtrl.delete
    )
module.exports = brandRoute