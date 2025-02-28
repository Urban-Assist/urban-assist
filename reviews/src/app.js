import express from "express";
import axios from "axios";
import cors from "cors";
import { Review } from "./model/Review.js";

 

const app = express();

//CORS configuration 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //whitelisted the given url
    credentials: true,
  })
);

//JSON body parser 
app.use(express.json({ limit: "20kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

//Static files
app.use(express.static("public"));

//load the public key for verification
let publicKey = null;
  // Fetch the public key once on startup
  async function fetchPublicKey() {
    try {
        const response = await axios.get('http://localhost:8080/auth/public-key');
        publicKey = response.data;
        console.log('Public key fetched successfully');
    } catch (error) {
        console.error('Error fetching public key:', error);
    }
  }

  // Call this function at startup
  fetchPublicKey();

// routes import
import { router } from "./routes/review.route.js";

//routes declaration
app.use("/reviews", router);
export { app , publicKey};