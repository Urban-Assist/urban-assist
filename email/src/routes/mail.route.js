import { Router } from "express";
import { sendMailFunction } from "../controllers/mail.controller.js";
const mailRouter = Router();

//Routes definition
mailRouter.post("/send", sendMailFunction); 


export default mailRouter;