import { Request, Response } from "express";
import logger from "../../utils/logger";
import { RegisterUserRequestInterface } from "../../interface/authInterface";
import { loginUserService, registerUserService } from "../../services/authService";

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password, first_name, last_name, username} = req.body;
        if(!email || !password || !first_name || !last_name || !username){
            res.status(400).json({message:"Bad Request"});
            return;
        }
        const user:RegisterUserRequestInterface = {
            email,
            password,
            first_name,
            last_name,
            username,
        }
        const userDetails = await registerUserService(user);
        res.status(201).json({message:"User registered successfully",userDetails});
    } catch (error) {
        logger.error('Error occurred in authController.registerUser',{error});
        if(error instanceof Error && error.message === "User already exists"){
            res.status(409).json({message: error.message});
            return;
        }
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const loginUserController = async(req:Request, res:Response): Promise<void> =>{ // Update the return type with interface 
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({message:"Bad Request"});
            return;
        };
        const result = await loginUserService(email, password);
        res.status(200).json({result:"success",message:"User logged in successfully",token:result.payload, userdetails:result.userDeatils});
        
    } catch (error) {
        logger.error('Error occurred in authController.loginUser',{error});
        if(error instanceof Error && error.message === "User not found"){
            res.status(404).json({message: error.message});
            return;
        }
        if(error instanceof Error && error.message === "Invalid Password"){
            res.status(401).json({message: error.message});
            return;
        }
        res.status(500).json({message:"Internal Server Error"});
    }
}