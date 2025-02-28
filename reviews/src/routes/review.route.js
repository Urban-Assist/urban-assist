 import { Router } from "express";
import{addReview,deleteProvider} from "../controllers/reviews.controller.js"
import  authenticateJWT from "../middlewares/verify.js";
 const router = Router();
 
//open routes


//secured routes
router.route("/addReview").post(addReview);
router.route("/providerDeleted").delete(deleteProvider);
router.route("/demo").get(authenticateJWT,(req,res)=>{
    res.status(200).send("hello");
})
export {  router };