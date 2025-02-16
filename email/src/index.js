import dotenv from "dotenv";
 import { app } from "./app.js";
import path from "path";
 const nodeEnv = process.env.ENV_MODE || 'development';
 const envFile = path.resolve(process.cwd(), `.env.${nodeEnv}`);
 dotenv.config({ path: envFile });
 
   
  app.listen(process.env.PORT || 8001, () => {
    console.log(`\n ⚙️ Server is running on port: ${process.env.PORT}`);
  })