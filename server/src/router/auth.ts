import { Router } from "express";
import { loginController, registerController } from "../controller/authController";
const routerAuth = Router();

routerAuth.post("/login", loginController )
routerAuth.post("/register", registerController);

export default routerAuth;