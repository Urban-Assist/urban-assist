import { sendMail } from "../utils/NodeMailer.config.js";
function sendMailFunction(req, res) {
    const { to, subject, text } = req.body;
    sendMail(to, subject, text)
      .then(() => {
        const response = {
          
          message: "Email sent successfully",
          status:200
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  }
  
  export { sendMailFunction };