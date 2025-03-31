import { Router } from "express";
import{authenticateJWT,authorizeRole} from "../middlewares/verify.js";
const router = Router();
 import { createService, listServices } from "../controllers/services.controller.js";
//open routes


//secured routes
router.route("/addService").post(authenticateJWT,authorizeRole("admin"),createService);
router.route("/getServices").get(authenticateJWT,authorizeRole(["provider","admin","user"]),listServices)

// to do : end point to raise the payment conflicts. - all the application entities

// to do : end point to retrieve the payment conflicts. - admin

// to do : end point to resolve the payment conflicts. - admin

router.route("/demo").get(authenticateJWT,authorizeRole("admin"),(req,res)=>{ //to do : use enum instead of hardcoded values
    res.status(200).send("hello");
})
export {  router };