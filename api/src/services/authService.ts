import logger from "../utils/logger"
import { RegisterUserRequestInterface } from "../interface/authInterface";
import bcrypt from "bcrypt";
import { getAllDetailsOfUser, getUserByEmailRepo, registerUserRepo } from "../repository/authRepository";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "./emailService";


export const registerUserService = async (user:RegisterUserRequestInterface):Promise<void> =>{
    try {
        const {email, password, first_name, last_name, username} = user;

        // Check if the email is already exits
        const checkUser = await getUserByEmailRepo(email);

        if(checkUser !== null){
            logger.info("User Already exists",{email})
            throw new Error("User already exists");
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = { email, password_hash: hashedPassword, first_name, last_name, username };
        await registerUserRepo(newUser);
        const userDeatils = await getAllDetailsOfUser(email);
        console.log('userDeatils:',userDeatils);
        await sendWelcomeEmail(email, first_name, last_name, username);
        return userDeatils;
    } catch (error) {
        logger.error("Error occurred in authService.registerUser",{error});
        throw error;
    }
}

export const loginUserService = async(email: string, password: string): Promise<string> => {
    try {
        const user = await getUserByEmailRepo(email);
        if(user === null){
            logger.info("User not found",{email})
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password_hash);
        if(!isPasswordValid){
            logger.info("Invalid Password",{email})
            throw new Error("Invalid Password");
        }
        const payload = jwt.sign({
            email:user.email,
            id:user.id,
            username:user.username
        },process.env.JWT_SECRET!,{
            expiresIn: process.env.JWT_EXPIRY as any
        });
        logger.info("Login successfull",{email});
        const userDeatils = await getAllDetailsOfUser(user.email);
        const userData = {userDeatils,payload}
        return userData as any;
        
    } catch (error) {
        logger.error("Error occurred in authService.loginUser",error);
        throw error;
    }
}
    