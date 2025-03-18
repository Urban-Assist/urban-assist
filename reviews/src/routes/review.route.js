 import { Router } from "express";
import{addReview,deleteProvider, getReviews} from "../controllers/reviews.controller.js"
import  {authenticateJWT, authorizeRole} from "../middlewares/verify.js";
 const router = Router();
 
//open routes


//secured routes
router.route("/addReview").post(authenticateJWT,authorizeRole(["user", "admin"]),addReview);
router.route("/providerDeleted").delete(deleteProvider);
router.route("/getReviews/:providerID").get(authenticateJWT,authorizeRole(["provider","admin","user"]), getReviews);
//to do : function to list all the reviews associated with a provider using the provider ID.


//End point to check authentication is working as expected or  not
router.route("/demo").get(authenticateJWT,authorizeRole(["provider","admin"]),(req,res)=>{ //to do : use enum instead of hardcoded values
    res.status(200).send("hello");
})
export {  router };