import { Router } from "express";
import {
  callRefreshTokenGetNewAcessToken,
  getcallRefreshTokenGetNewAcessToken,
  loginController,
  registerController,
} from "../controller/authController";
const routerAuth = Router();

routerAuth.post("/login", loginController);
routerAuth.post("/register", registerController);

routerAuth.post("/refreshtoken", callRefreshTokenGetNewAcessToken);
routerAuth.get("/refreshtoken", getcallRefreshTokenGetNewAcessToken);
export default routerAuth;
