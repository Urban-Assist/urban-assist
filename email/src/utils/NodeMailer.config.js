import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
 
    const MAIL_ADDRESS = process.env.EMAIL_ADDRESS;
    const MAIL_ACCESS = process.env.MAIL_ACCESS_TOKEN;
    console.log(MAIL_ADDRESS, MAIL_ACCESS);

    const transporter =  nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: MAIL_ADDRESS,
            pass: MAIL_ACCESS
        },
     });
 

const sendMail = async (receiver, subject, data) => {
    try {
        
        
        const mailData = {
            from: process.env.EMAIL_ADDRESS,
            to: receiver,
            subject: subject,
            html: data
        };

        const info = await transporter.sendMail(mailData);
        console.log('Email sent:', info.response );
        console.log(info.envelope)
        return info;
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
};

export {   sendMail };