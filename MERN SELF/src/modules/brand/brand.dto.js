const Joi = require('joi')
const brandCreateDTO = Joi.object({
    title: Joi.string().min(2).required(),
    status: Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image: Joi.string().empty(null, "").optional().default(null),
    homeSection: Joi.boolean().default(false)
})
const brandUpadateDTO = Joi.object({
    title: Joi.string().min(2).required(),
    status: Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image: Joi.string().empty(null, "").optional().default(null),
    homeSection: Joi.boolean().default(false)
})

module.exports = {
    brandCreateDTO,
    brandUpadateDTO
}