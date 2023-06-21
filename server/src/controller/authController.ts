import { NextFunction, Request, Response } from "express";
import { ruleLogin } from "../validate/authvalidate";
import User from "../models/User";
import bcrypt from "bcrypt";
import { customError, hashPassWord } from "../fnhelper";
import { generateJWT } from "../middleware/checkauth";
import jwt from "jsonwebtoken";

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
    const findOptions = { username: req.body.username };
    const checkIsExitsUser = await User.findOne({ where: findOptions });
    if (checkIsExitsUser) {
      throw new customError(400, "User đã tồn tại trong hệ thống", null);

      // throw new Error("User không tồn tại");
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
      res.status(400).json({ error: error?.details[0].message }); //trả về message lỗi khi bất kỳ trường nào là không hợp lệ
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
      checkIsExitsUser?.dataValues.password
    );
    if (!checkpassword) {
      throw new customError(400, "Username hoặc password không đúng", null);
    }
    const accessToken = generateJWT(30)
    const reFreshToken = generateJWT(3600)
    res.cookie('refreshtokenIncookie', reFreshToken, {  sameSite: 'none',secure:true,
    //  secure: true, cái này cho https
     maxAge: 24 * 60 * 60 * 1000 ,  httpOnly : true});
    res.status(200).json({
      message: "Login thành công",
      data: {
        username: value.username,
        token: accessToken,
        reFreshToken: reFreshToken  //do khong xu ly duoc cookie kia nen danh luu tam vao localstorage truoc
      },
   
    });
  } catch (error) {
    next(error);
  }
}
//hàm này thì lấy accesstoken trong localstorage
export function callRefreshTokenGetNewAcessToken(req:Request, res:Response, next:NextFunction) {
    // console.log("refreshtoken trong cookie gửi từ client", req.headers, req.cookies?.refreshtokenIncookie)
   try {
    const refreshtoken = req.body.refreshtoken;
    console.log('refreshtoken', req.body.refreshtoken)
    if (!refreshtoken) {
      throw new customError(403, "Authorization!", null);
    }
    if (!process.env.PRIVATE_KEY) {
        throw new Error(
          "Private key not found. Ensure that the PRIVATE_KEY environment variable is set."
        );
      }
    const decode = jwt.verify(refreshtoken, process.env.PRIVATE_KEY);
    console.log(`decoderefreshtoken`, decode)
    res.status(200).json({
      message: "call refresh token thành công",
      accessTokenNew: generateJWT(30)
      
    })
   } catch (error) {
    console.log("errrefreshtoken", error)
    next(error)
   }
  
}


//hàm này lấy refreshtoken trong cookie http only true trong khi hàm trên thì lấy accesstoken trong localstorage
export function getcallRefreshTokenGetNewAcessToken(req:Request, res:Response, next:NextFunction) {
  // console.log("refreshtoken trong cookie gửi từ client", req.headers, req.cookies?.refreshtokenIncookie)
 try {
  const refreshtokenCookie = req.headers.cookie;
  const refreshtoken = refreshtokenCookie?.split("=")?.[1]
  console.log('refreshtokenget', req.headers.cookie, refreshtoken)
  if (!refreshtoken) {
    throw new customError(403, "Authorization!", null);
  }
  if (!process.env.PRIVATE_KEY) {
      throw new Error(
        "Private key not found. Ensure that the PRIVATE_KEY environment variable is set."
      );
    }
  const decode = jwt.verify(refreshtoken, process.env.PRIVATE_KEY);
  console.log(`decoderefreshtoken`, decode)
  res.status(200).json({
    message: "call refresh token thành công",
    data: {
      accessTokenNew: generateJWT(30)
    }

    
  })
 } catch (error) {
  console.log("errrefreshtoken", error)
  next(error)
 }

}