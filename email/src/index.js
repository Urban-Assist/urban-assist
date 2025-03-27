import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();  
   
  app.listen(process.env.EMAIL_MICROSERVICE_PORT || 8001, () => {
    console.log(`\n ⚙️ Server is running on port: ${process.env.EMAIL_MICROSERVICE_PORT}`);
  })