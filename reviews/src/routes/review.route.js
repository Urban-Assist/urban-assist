 import { Router } from "express";
import{addReview,deleteProvider} from "../controllers/reviews.controller.js"
 const router = Router();
 
//open routes


//secured routes
router.route("/addReview").post(addReview);
router.route("/providerDeleted").delete(deleteProvider);
export {  router };