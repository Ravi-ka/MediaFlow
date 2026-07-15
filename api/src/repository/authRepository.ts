import pool from "../database/postgres";
import logger from "../utils/logger";
import { UserRecord } from "../interface/authInterface";

export const registerUserRepo = async (newUser: Pick<UserRecord, 'email' | 'passwordHash' | 'subscriptionTier'>): Promise<void> => {
    try {
    const {email, passwordHash, subscriptionTier} = newUser;
    const query = `INSERT INTO mediaflow_users (email, "passwordHash", "subscriptionTier") VALUES ($1, $2, $3)`;
    await pool.query(query,[email, passwordHash, subscriptionTier]);
    logger.info("User registered successfully in authRepository.registerUser",{email});
    return;
    } catch (error) {
        logger.error("Error occurred in authRepository.registerUser",{error});
        throw error;
    }
}

export const getUserByEmailRepo = async (email: string): Promise<UserRecord | null> => {
    try {
        const {rows} = await pool.query('SELECT id, email, "passwordHash", "subscriptionTier" FROM mediaflow_users WHERE email = $1',[email]);
        return rows[0] || null;
    } catch (error) {
        logger.error("Error occurred in authRepository.getUserByEmailRepo",{error});
        throw error;
    }
}