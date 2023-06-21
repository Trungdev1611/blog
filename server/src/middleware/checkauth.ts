import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { customError } from "../fnhelper";
dotenv.config();

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers?.authorization;
    if (!token) {
      throw new customError(401, "Authorization!", null);
    }
    if (!process.env.PRIVATE_KEY) {
        throw new Error(
          "Private key not found. Ensure that the PRIVATE_KEY environment variable is set."
        );
      }
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log(`decode`, decode)
    next()

  } catch (error) {
   let errorCustom =   new customError(401, "Authorization!", null);
  
   next(errorCustom)
  }
}

export function generateJWT(time:number) {
  if (!process.env.PRIVATE_KEY) {
    throw new Error(
      "Private key not found. Ensure that the PRIVATE_KEY environment variable is set."
    );
  }

  return jwt.sign({ foo: "bar" }, process.env.PRIVATE_KEY, { expiresIn: time }); //30s
}
