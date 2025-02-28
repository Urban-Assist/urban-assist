import { Review } from '../model/Review.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

//Function to add a review
const addReview = async (req, res) => {
    //get the data from request body.
    const review = req.body;
    
    try {
        const newReview = await Review.create(review);
        return res
        .status(201)
        .json(200,newReview,"Review created successfully" + review.review);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: "There was an error creating the review" });
    }
}

export{addReview};