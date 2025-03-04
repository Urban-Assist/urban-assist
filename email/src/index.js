 import "./envConfig.js";
 import { app } from "./app.js";
 
 
   
  app.listen(process.env.PORT || 8001, () => {
    console.log(`\n ⚙️ Server is running on port: ${process.env.PORT}`);
  })