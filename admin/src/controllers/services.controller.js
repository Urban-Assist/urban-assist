 import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { Service } from '../model/Service.js';
const createService = async (req, res) => {
     try {
        const service = req.body;
        const serviceName = await Service.create(service);
        console.log(serviceName+"created ✅");
        return res.status(201).json(new ApiResponse(201
            ,`Service ${service.name} created successfully`,service));
        
     } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500,"Internal Server Error"));
     }
}

const listServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        return res.status(200).json(new ApiResponse(200,"Services fetched successfully",services));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500,"Internal Server Error"));
    }
}
export { createService , listServices };