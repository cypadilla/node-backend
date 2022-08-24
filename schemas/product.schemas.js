const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(20);
const price = Joi.number().positive().integer().min(3);
const image = Joi.string().uri()
const createProductSchema = Joi.object({
  name:name.required(),
  price:price.required(),
  image:image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price:price,
  image:image
});

const getProductSchema = Joi.object({
  id:id.required(),
});

module.exports = { createProductSchema,updateProductSchema,getProductSchema }
//
