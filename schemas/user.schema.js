const Joi = require('joi');

const id = Joi.string();
const firstName = Joi.string().min(3).max(20);
const lastName = Joi.string().min(3);
const avatar = Joi.string().uri();
const email = Joi.string().email();
const cellphone = Joi.number().max(10).min(10);
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  firstName:firstName.required(),
  lastName:lastName,
  avatar:avatar,
  email:email.required(),
  cellphone:cellphone,
  password:password.required()
});

const updateUserSchema = Joi.object({
  firstName:firstName,
  lastName:lastName,
  avatar:avatar,
  email:email,
  cellphone:cellphone,
  password:password
});

const getUserSchema = Joi.object({
  id:id.required(),
});

module.exports = {createUserSchema,updateUserSchema,getUserSchema}
