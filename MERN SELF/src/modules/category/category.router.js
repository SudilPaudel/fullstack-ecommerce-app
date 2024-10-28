const categoryRoute = require('express').Router()
const categoryCtrl = require('./category.controller')
const { bodyValidator } = require('../../middleware/validator.middleware')
const { setPath, uploader } = require('../../middleware/uploader.middleware')
const auth = require('../../middleware/auth.middleware')
const { categoryCreateDTO, categoryUpadateDTO } = require('./category.dto')
const allowRole = require('../../middleware/rbac.middleware')

categoryRoute.get('/home-list', categoryCtrl.listForHome)
categoryRoute.get('/:slug/detail', categoryCtrl.getDetailBySlug)
categoryRoute.route("/")
    .post(auth, allowRole('admin') ,setPath('categories'),uploader.single('image'),bodyValidator(categoryCreateDTO), categoryCtrl.createCategory)
    .get(auth, allowRole('admin'), categoryCtrl.categoryList)

categoryRoute.route('/:id')
    .get(auth, allowRole('admin'), categoryCtrl.showById)
    .put(
        auth, 
        allowRole('admin'), 
        setPath("categories"),
        uploader.single('image'), 
        bodyValidator(categoryUpadateDTO, ['image']),
        categoryCtrl.update
    )
    .delete(
        auth, 
        allowRole('admin'),
        categoryCtrl.delete
    )
module.exports = categoryRoute