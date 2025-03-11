import { Router } from "express";
import{authenticateJWT,authorizeRole} from "../middlewares/verify.js";
const router = Router();
 import { createService } from "../controllers/services.controller.js";
//open routes


//secured routes
router.route("/addService").post(authenticateJWT,authorizeRole("admin"),createService);


router.route("/demo").get(authenticateJWT,authorizeRole("admin"),(req,res)=>{ //to do : use enum instead of hardcoded values
    res.status(200).send("hello");
})
export {  router };