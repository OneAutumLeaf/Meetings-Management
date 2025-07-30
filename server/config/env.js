// config/env.js
import dotenv from "dotenv";
dotenv.config();

export const MEETING_API_URL = process.env.MEETING_API_URL;
export const LARAVEL_API_URL = process.env.LARAVEL_API_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
