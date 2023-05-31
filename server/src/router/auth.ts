import { Router } from "express";
import { Request, Response } from "express";
import Joi from 'joi';
const routerAuth = Router();

const ruleLogin = Joi.object({
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
  


routerAuth.post("/login", (req: Request, res: Response) => {
  console.log(req.body)
  const {error, value} = ruleLogin.validate(req.body)
  if(error) {
    res.status(400).json({error: error.details[0].message});   //trả về message lỗi khi bất kỳ trường nào là không hợp lệ
    return 
  }
  res.status(200).json({
    message: "login thành công111111",
    data: value
  });
});



const ruleRegister = ruleLogin.keys({
  repeatPassword: Joi.valid(Joi.ref('password'))
  .required()
})
routerAuth.post("/register", (req: Request, res: Response) => {
  const {error, value} = ruleRegister.validate(req.body)
  if(error) {
    res.status(400).json({error: error.details[0].message});   //trả về message lỗi khi bất kỳ trường nào là không hợp lệ
    return 
  }
  res.status(200).json({
    message: "register thành công",
    data: value
  });
});
export default routerAuth;