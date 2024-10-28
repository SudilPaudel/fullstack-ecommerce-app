const bannerRoute = require('express').Router()
const bannerCtrl = require('./banner.controller')
const { bodyValidator } = require('../../middleware/validator.middleware')
const { setPath, uploader } = require('../../middleware/uploader.middleware')
const auth = require('../../middleware/auth.middleware')
const { bannerCreateDTO, bannerUpadateDTO } = require('./banner.dto')
const allowRole = require('../../middleware/rbac.middleware')

bannerRoute.get('/home-list', bannerCtrl.listForHome)
bannerRoute.route("/")
    .post(auth, allowRole('admin') ,setPath('banners'),uploader.single('image'),bodyValidator(bannerCreateDTO), bannerCtrl.createBanner)
    .get(auth, allowRole('admin'), bannerCtrl.bannerList)

bannerRoute.route('/:id')
    .get(auth, allowRole('admin'), bannerCtrl.showById)
    .put(
        auth, 
        allowRole('admin'), 
        setPath("banners"),
        uploader.single('image'), 
        bodyValidator(bannerUpadateDTO, ['image']),
        bannerCtrl.update
    )
    .delete(
        auth, 
        allowRole('admin'),
        bannerCtrl.delete
    )
module.exports = bannerRoute