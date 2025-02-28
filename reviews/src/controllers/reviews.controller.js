import { Review } from '../model/Review.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import amqp from 'amqplib';
//Function to add a review
const addReview = async (req, res) => {
    //get the data from request body.
    const review = req.body;
    
    try {
        const newReview = await Review.create(review);
        return res
        .status(201)
        .json(new ApiResponse(200,newReview,"Review created successfully" + review.review));
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: "There was an error creating the review" });
    }
}

//Function to delete a reviews associated with the provider.
const deleteProvider = async (req, res) => {
    const QUEUE_NAME= process.env.RABIT_MQ_NAME;
    const QUEUE_URL= process.env.RABIT_MQ_URL;
    try {

      // Connect to the RabbitMQ server
      const connection = await amqp.connect(QUEUE_URL);
      const channel = await connection.createChannel();
      const queue = QUEUE_NAME;
      
      // Assert the queue
      await channel.assertQueue(queue, { durable: false });
      console.log('Queue created: ', queue);
      
      // Process messages from the queue
      channel.consume(queue, async (msg) => {
        try {
          console.log('Message received: ', msg.content.toString());
          const { userId } = JSON.parse(msg.content.toString());
          
          // Check if there are reviews for this provider
          const provider = await Review.findOne({ where: { providerID: userId } });
          
          if (provider) {
            // Delete the reviews associated with the provider
            const deletedProvider = await Review.destroy({
              where: { providerID: userId }
            });

            //send the response
            return res
            .status(200)
            .json(new ApiResponse(200,"Reviews deleted successfully " + deletedProvider,null));

            console.log(`Deleted ${deletedProvider} reviews for provider ${userId}`);
          } else {
            // No reviews found for this provider, just log and proceed
            console.log(`No reviews found for provider ${userId}, skipping deletion`);
          }
          
          // Acknowledge the message to remove it from the queue
          channel.ack(msg);
          
        } catch (error) {
          console.error('Error processing message:', error);
          // Still acknowledge the message to remove it from the queue
          channel.ack(msg);
        }
      });
      
    } catch (error) {
      console.error('Error in deleteProvider:', error);
      res.status(400).send({ message: "There was an error deleting the provider" });
    }
  };
export{addReview,deleteProvider};