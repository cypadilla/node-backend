const Joi = require('joi');

const id = Joi.string();
const first_name = Joi.string().min(3).max(20);
const last_name = Joi.string().min(3);
const avatar = Joi.string().uri();
const email = Joi.string().email()
const cellphone = Joi.number().max(10).min(10)

const createUserSchema = Joi.object({
  first_name:first_name.required(),
  last_name:last_name,
  avatar:avatar,
  email:email.required(),
  cellphone:cellphone,
});

const updateUserSchema = Joi.object({
  first_name:first_name,
  last_name:last_name,
  avatar:avatar,
  email:email,
  cellphone:cellphone,
});

const getUserSchema = Joi.object({
  id:id.required(),
});

module.exports = {createUserSchema,updateUserSchema,getUserSchema}
