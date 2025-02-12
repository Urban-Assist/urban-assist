import { sendMail } from "../utils/NodeMailer.config.js";
function sendMailFunction(req, res) {
    const { to, subject, text } = req.body;
    sendMail(to, subject, text)
      .then(() => {
        res.status(200).send("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  }
  
  export { sendMailFunction };