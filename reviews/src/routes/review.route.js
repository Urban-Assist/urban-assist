 import { Router } from "express";
import{addReview} from "../controllers/reviews.controller.js"
 const router = Router();
 
//open routes


//secured routes
 router.route("/addReview").post(addReview);

export {  router };