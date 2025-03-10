// setupEnv.js
import dotenv from "dotenv";
import path from "path";

// Determine the environment mode (development, production, etc.)
const nodeEnv = process.env.NODE_ENV || "development";

// Resolve the correct .env file based on the environment
const envFile = path.resolve(process.cwd(), `.env.${nodeEnv}`);

// Load the environment variables from the .env file
dotenv.config({ path: envFile });

console.log(`Environment variables loaded from: ${envFile}`);