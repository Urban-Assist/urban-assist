import express from "express";
import dotenv from "dotenv";
 import cors from "cors";
 import {db} from './db/index.js'
  import {connection} from './db/index.js'
  import { Review } from "./model/Review.js";
 dotenv.config();

 const app = express();
/*cors allow access to the network from the 
cross-origin. means www.example.com can allow 
resource usage to the www.api.com is the later
 one is whitelisted in the former one.*/
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //whitelisted the given url
    credentials: true,
  })
);
 

 
app.use(express.json({ limit: "20kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

app.use(express.static("public"));

db.sync().then(() => {
  console.log("Database synced");
}
).catch((err) => {
  console.error("Error in syncing database", err);
}
);
app.post('/ping', (req, res) => {
  Review.create({ 
    userId: 1,
    review: 'This is a review',
    rating: 5
  })
  .then((review) => {
    res.send(review);
  })
  .catch((
    err) => {
    console.error(err);
    res.status(500).send('An error occurred');
  }
  );
 });

// routes import
 //routes declaration
export { app };