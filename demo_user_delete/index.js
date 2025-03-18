import express from 'express';
import amqp from 'amqplib';
const app = express();

const deleteUser = async(req, res) => {
  const { userId } = req.params;
  //rabit queue connection
     const connection = await amqp.connect('amqp://localhost');
     //create chanel
    const channel = await connection.createChannel();

    const queue = 'deleteUser';
    
    const msg = { userId };
    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log(`Message sent: ${JSON.stringify(msg)}`);
}



const getUserDetails = async(req,res)=>{
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'reviews_user_queue';

  channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify({userID: 1})));  
  console.log(`Message sent: ${1}`);
  res.send('Message sent');
}
app.get('/deleteUser/:userId', deleteUser);
app.get('/getUsers',getUserDetails);
app.listen(9000, () => {
  console.log('Server is running on port 9000');
});