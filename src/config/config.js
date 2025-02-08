import dotenv from "dotenv";

dotenv.config();

const { PORT, DATABASE_URI } = process.env;

export const _config = {
  PORT: PORT || 4000,
  DATABASE_URI
}; 