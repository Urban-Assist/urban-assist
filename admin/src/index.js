
import { app } from "./app.js";
 import {connection,db} from './db/db.js'
import dotenv from 'dotenv'
 import { Service } from "./model/Service.js";
dotenv.config()
//connect to the database.

 function demo () {
   console.log("env :"+ process.env.CORS_ORIGIN);
 };
 demo();
connection();
db.sync().then(() => {
  console.log("Database synced");
}
).catch((err) => {
  console.error("Error in syncing database", err);
}
);
  
//start the server
app.listen(process.env.PORT || 8001, () => {
    console.log(`\n ⚙️ Server is running on port: ${process.env.PORT}`);
})