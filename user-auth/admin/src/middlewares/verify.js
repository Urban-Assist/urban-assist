import { ApiError } from "../utils/ApiError.js";
 import jwt from "jsonwebtoken";
 import dotenv from 'dotenv'
dotenv.config();

 function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    // Convert secret to Buffer to match Java's byte encoding
const JWT_SECRET= process.env.JWT_SECRET;
    const jwt_secret = Buffer.from(JWT_SECRET, "base64");

    if (!token) {
        throw new ApiError(401, 'Unauthorized');
    }

    console.log("Received Token:", token);
    
    try {
        
        
        // Verify with Buffer-based secret
        const decoded = jwt.verify(token, jwt_secret, { algorithms: ['HS256'] });
        console.log("Decoded Token:", decoded);

        // Attach user data to request
        req.user =  decoded;
        console.log("Authentication ✅");
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

function authorizeRole(expected) {
    return function(req, res, next) {
        // Get user roles as array
        const actualRoles = Array.isArray(req.user.roles) ? req.user.roles : [req.user.roles];
        console.log("Actual Role:", actualRoles);

        // Convert expected roles to array if not already
        const expectedRoles = Array.isArray(expected) ? expected : [expected];
        console.log("Expected Roles:", expectedRoles);
        
        // Check if any of the user's roles match any expected role
        const hasAuthorizedRole = actualRoles.some(role => expectedRoles.includes(role));
        
        if(hasAuthorizedRole) {
            console.log("Authorization ✅");
            return next();
        }
        console.error("Authorization ❌");
        return res.status(403).json({ error: 'Forbidden' }); // to do use api util  
    }
}

export {authenticateJWT, authorizeRole};