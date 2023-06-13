import { Router } from "express";
import { callRefreshTokenGetNewAcessToken, loginController, registerController } from "../controller/authController";
const routerAuth = Router();

routerAuth.post("/login", loginController )
routerAuth.post("/register", registerController);

routerAuth.get('/refreshtoken', callRefreshTokenGetNewAcessToken)
export default routerAuth;