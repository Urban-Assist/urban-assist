import express from 'express';
import amqp from 'amqplib';
const app = express();

const deleteUser = async(req, res) => {
  const { userId } = req.params;
     const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'deleteUser';
    const msg = { userId };
    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log(`Message sent: ${JSON.stringify(msg)}`);
}

app.get('/deleteUser/:userId', deleteUser);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});