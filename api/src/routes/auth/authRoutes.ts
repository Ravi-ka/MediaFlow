import { Router } from "express";
import { loginUserController, registerUserController } from "../../controllers/auth/authController";

const authRouter: Router = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login",loginUserController)

export default authRouter;