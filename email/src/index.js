import dotenv from "dotenv";
 import { app } from "./app.js";
dotenv.config({ path: "./.env" });
 
   
  app.listen(process.env.PORT || 8001, () => {
    console.log(`\n ⚙️ Server is running on port: ${process.env.PORT}`);
  })