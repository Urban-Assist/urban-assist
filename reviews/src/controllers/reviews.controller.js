import { Review } from '../model/Review.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import amqp from 'amqplib';
//Function to add a review
const addReview = async (req, res) => {
    try {
        const { providerID, review } = req.body;
        
        if (!providerID || !review || review === "") {
          console.log("providerID or the review is missing ❌")
          return res.status(400).json(
            new ApiResponse(400, null,"Provider ID and review content are required")
          );
             
        }
        
        const consumerID = req.user?.id;
        if (!consumerID) {
          return res.status(401).json(
            new ApiResponse(401,null, "User authentication required")
          );
        }
            
     

        const newReview = await Review.create({
            providerID,
            consumerID,
            review,
            rating: req.body.rating || null
        });
        
        return res.status(201).json(
            new ApiResponse(201, "Review created successfully", newReview)
        );
    } catch (error) {
        throw new ApiError(500, "Failed to create review", error);
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
      throw new ApiError(400,"Something went wrong while deleting provider.",error)
    }
  };

  const getReviews = async(req,res)=> {

    try {
      //if there is no providerId in the request
      const {providerID} = req.params;
      console.log("providerID",providerID)
      if(!providerID){
        return res.status(400).json(new ApiResponse(400,null,"Provider Id is missing"))
      }

      //fetch all the reviews associated with the ID  from the database 
      const reviews = await Review.findAll({
        where: {providerID: providerID},
        order: [['rating', 'DESC']],
        limit: 5
      });

      //if there is no reviews in the database for the given providerID 
      if(!reviews){
        return res.status(404).json(new ApiResponse(404,null,"No reviews found for the provider"+req.providerID))
      }
      //else send the response containing 
      else{
        return res.status(200).json(new ApiResponse(200,reviews,"Reviews found for the provider"+req.providerID))
      }
    
    } catch (error) {
      throw new ApiError(500,"Failed to get reviews, Something went wrong",error)
    }
    }
export{addReview,deleteProvider, getReviews};