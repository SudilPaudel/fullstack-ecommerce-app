const auth = require('../../middleware/auth.middleware');
const allowRole = require('../../middleware/rbac.middleware');
const userCtrl = require('./user.controller');

const userRoute = require('express').Router()

userRoute.route('/')
    .get(auth, allowRole('admin'), userCtrl.index)

module.exports = userRoute;