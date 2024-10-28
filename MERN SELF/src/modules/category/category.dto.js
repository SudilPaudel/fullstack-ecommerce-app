const Joi = require('joi')
const categoryCreateDTO = Joi.object({
    title: Joi.string().min(2).required(),
    status: Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image: Joi.string().empty(null, "").optional().default(null),
    parentId: Joi.string().allow(null, "").default(null)
})
const categoryUpadateDTO = Joi.object({
    title: Joi.string().min(2).required(),
    status: Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image: Joi.string().empty(null, "").optional().default(null),
    parentId: Joi.string().allow(null, "").default(null)
})

module.exports = {
    categoryCreateDTO,
    categoryUpadateDTO
}