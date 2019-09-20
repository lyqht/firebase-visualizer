
import * as dotenv from "dotenv";
console.log(__dirname)
dotenv.config()

export const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
export const clientEmail = process.env.REACT_APP_FIREBASE_CLIENT_EMAIL;
const privateKeyUnformatted = process.env.REACT_APP_FIREBASE_SECRET_KEY;
export const privateKey = privateKeyUnformatted.replace(/\\n/g, '\n')
export const databaseURL = process.env.REACT_APP_FIREBASE_DATABASE_URL;