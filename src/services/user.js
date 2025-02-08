import { db } from "../config/database.js";
import { users } from "../models/user.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

class UserService {
  static async createUser(name, email, password) {
    try {
      logger.info(
        `Creating user ${name} with email ${email} and password ${password}`

      );



      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create user
      const [newUser] = await db
        .insert(users)
        .values({ name, email, password: hashedPassword })
        .returning();
      return newUser;


    } catch (error) {
      logger.error(
        `Error creating user ${name} with email ${email} and password ${password}: ${error}`
      );
      throw new Error(error);
    }
  }
}

export default UserService;
