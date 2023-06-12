import Joi from "joi"

export const ruleLogin = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required().messages({
          'string.base': 'Username must be a string',
          'string.alphanum': 'Username must only contain alphanumeric characters',
          'string.min': 'Tên người dùng phải có ít nhất 3 ký tự',
          'string.max': 'Username must have a maximum length of {#limit}',
          'any.required': 'Username is required',
        }),
  
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  
    // repeat_password: Joi.ref('password'),
  
  })

  // export const ruleRegister = ruleLogin.keys({
  //   repeatPassword: Joi.valid(Joi.ref('password'))
  //   .required()
  // })