import { app } from "./app.js";
 import {connection,db} from './db/db.js'
import dotenv from 'dotenv'
dotenv.config()
//connect to the database.

 
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