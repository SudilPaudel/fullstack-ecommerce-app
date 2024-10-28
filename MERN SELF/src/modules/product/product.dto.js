const Joi = require('joi')
const productCreateDTO = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().required(),
    description: Joi.string().allow(null, "").optional().default(null),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(90).default(0),
    categories: Joi.array().items(Joi.string()).allow(null, "").optional().default(null),
    brand: Joi.string().allow(null, "").optional().default(null),
    sellerId : Joi.string().allow(null, "").default(null),
    status: Joi.string().pattern(/^(active|inactive)$/).default("inactive"),
    isFeatured: Joi.boolean().default("false"),
    images: Joi.array().items(Joi.string().allow(null, '')).allow(null, '').optional().default(null)
})
const productUpadateDTO = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().required(),
    description: Joi.string().allow(null, "").optional().default(null),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(90).default(0),
    categories: Joi.array().items(Joi.string()).allow(null, "").optional().default(null),
    brand: Joi.string().allow(null, "").optional().default(null),
    sellerId : Joi.string().allow(null, "").default(null),
    status: Joi.string().pattern(/^(active|inactive)$/).default("inactive"),
    isFeatured: Joi.boolean().default("false"),
    images: Joi.array().items(Joi.string().allow(null, '')).allow(null, '').optional().default(null)
})

module.exports = {
    productCreateDTO,
    productUpadateDTO
}