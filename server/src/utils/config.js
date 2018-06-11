import dotenv from 'dotenv-safe';

dotenv.load();

export const port = process.env.PORT || 8000;
export const secret = process.env.SECRET;
export const database = process.env.DATABASE;
export const admin = process.env.ADMIN;
export const password = process.env.PASSWORD;