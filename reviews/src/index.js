  import { app } from "./app.js";
 import {connection} from './db/index.js'
 
  connection();
  app.listen(process.env.PORT || 8001, () => {
    console.log(`\n ⚙️ Server is running on port: ${process.env.PORT}`);
  })