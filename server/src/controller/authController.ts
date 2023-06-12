import { NextFunction, Request, Response } from "express";
import { ruleLogin } from "../validate/authvalidate";
import User from "../models/User";
import bcrypt from "bcrypt";
import { customError, hashPassWord } from "../fnhelper";
import { generateJWT } from "../middleware/checkauth";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error, value } = ruleLogin.validate(req.body);
  try {
    if (error) {
      res.status(400).json({ error: error.details[0].message }); //trả về message lỗi khi bất kỳ trường nào là không hợp lệ
      return;
    }

    //hash password
    const passwordhash = hashPassWord(req.body.password);
    const data = { ...req.body, password: passwordhash };
    await User.create(data, { fields: ["username", "password"] });
    res.status(200).json({
      message: "register thành công",
      data: value,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  const { error, value } = ruleLogin.validate(req.body);
  try {
    if (error) {
      res.status(400).json({ error: error.details[0].message }); //trả về message lỗi khi bất kỳ trường nào là không hợp lệ
      return;
    }
    const findOptions = { username: req.body.username };
    const checkIsExitsUser = await User.findOne({ where: findOptions });
    if (!checkIsExitsUser) {
      throw new customError(400, "User không tồn tại", null);

      // throw new Error("User không tồn tại");
    }
    let checkpassword = bcrypt.compareSync(
      req.body.password,
      checkIsExitsUser.dataValues.password
    );
    if (!checkpassword) {
      throw new customError(400, "Username hoặc password không đúng", null);
    }
    res.status(200).json({
      message: "Login thành công",
      data: {
        username: value.username,
        token: generateJWT()
      },
   
    });
  } catch (error) {
    next(error);
  }
}
