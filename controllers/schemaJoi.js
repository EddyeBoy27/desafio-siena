const Joi = require('joi');
// const errorJoi = require('./errorJoi');

const workflow = Joi.object({
    UUID: Joi.string().min(5).max(50).required(),
    status: Joi.number().required(),
    data: Joi.object().keys({
        id: Joi.number().required(),
        status: Joi.number().required(),
        bol: Joi.boolean().required(),
    }).required(),
    steps: Joi.array().items(Joi.string(), Joi.number(), Joi.boolean()),
});

const validateJoi = async (schema, req) => {
    const valid = await schema.validateAsync(req).catch((err) => {
        const error = { error: { message: err.message, code: 'invalidData' } };
        throw error;
    });
    return valid;
};

module.exports = {
    workflow,
    validateJoi,
};