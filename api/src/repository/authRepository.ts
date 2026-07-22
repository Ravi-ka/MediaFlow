import pool from "../database/postgres";
import logger from "../utils/logger";
import { UserRecord } from "../interface/authInterface";

export const registerUserRepo = async (newUser: Pick<UserRecord, 'email' | 'password_hash' | 'first_name' | 'last_name' | 'username'>): Promise<void> => {
    try {
    const {email, password_hash, first_name, last_name, username} = newUser;
    const query = `INSERT INTO users (email, "password_hash", first_name, last_name, username) VALUES ($1, $2, $3, $4, $5)`;
    await pool.query(query,[email, password_hash, first_name, last_name, username]);
    logger.info("User registered successfully in authRepository.registerUser",{email});
    return;
    } catch (error) {
        logger.error("Error occurred in authRepository.registerUser",{error});
        throw error;
    }
}

export const getUserByEmailRepo = async (email: string): Promise<UserRecord | null> => {
    try {
        const {rows} = await pool.query('SELECT id, email, "password_hash" FROM users WHERE email = $1',[email]);
        return rows[0] || null;
    } catch (error) {
        logger.error("Error occurred in authRepository.getUserByEmailRepo",{error});
        throw error;
    }
}

export const getAllDetailsOfUser = async (email:string):Promise<void> =>{
try {
    const {rows} = await pool.query("SELECT id, first_name, last_name, username,email,profile_image_url, role, subscription_tier, created_at FROM users WHERE email = $1",[email]);
    return rows[0] as any| null;
} catch (error) {
    logger.error("Error occurred in authRepository.getAllDetailsOfUser",{error})
    throw error;
}
}