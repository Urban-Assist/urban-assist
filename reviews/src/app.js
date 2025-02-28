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
        // Format the public key with proper PEM format
        const rawKey = response.data;
        publicKey = `-----BEGIN PUBLIC KEY-----\n${
            rawKey
                .replace('-----BEGIN PUBLIC KEY-----', '')
                .replace('-----END PUBLIC KEY-----', '')
                .replace(/\s/g, '')
                .match(/.{1,64}/g)
                .join('\n')
        }\n-----END PUBLIC KEY-----`;
        
        console.log('Formatted Public Key:');
        console.log(publicKey);
        console.log('Public key fetched and formatted successfully');
    } catch (error) {
        console.error('Error fetching public key:', error);
        throw error; // Propagate the error
    }
}

  // Call this function at startup
  fetchPublicKey();

// routes import
import { router } from "./routes/review.route.js";

//routes declaration
app.use("/reviews", router);
export { app , publicKey};