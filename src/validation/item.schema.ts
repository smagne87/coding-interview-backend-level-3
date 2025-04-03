import Joi from '@hapi/joi';

export const itemSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().required().min(0).messages({
        'any.required': 'Field "price" is required',
        'number.base': 'Field "price" must be a number',
        'number.min': 'Field "price" cannot be negative'
    })
});
