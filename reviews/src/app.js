import express from "express";
import dotenv from "dotenv";
 import cors from "cors";
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
 
// routes import
import { reviewsRouter } from "./routes/reviews.js";
//routes declaration
app.use("/reviews", reviewsRouter);
 export { app };