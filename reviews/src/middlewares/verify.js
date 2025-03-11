<<<<<<< Updated upstream
=======
import { ApiError } from "../utils/ApiError.js";
import { publicKey } from "../utils/FetchPK.js";
>>>>>>> Stashed changes
import jwt from "jsonwebtoken";

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    // Convert secret to Buffer to match Java's byte encoding
    const jwt_secret = Buffer.from("vaibhav", "utf-8");

    if (!token) {
<<<<<<< Updated upstream
        return res.status(401).json({ error: 'Unauthorized' });
=======
        throw new ApiError(401, 'Unauthorized');
>>>>>>> Stashed changes
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

function authorizeRole( expected ) {
    return function(req, res, next) {
        const actualRole = req.user.roles
        console.log("Actual Role:", actualRole);

        //convert the expected role to an array if it is not
        const expectedRoles = Array.isArray(expected) ? expected : [expected];
        console.log("Expected Roles:", expectedRoles);
        if(expectedRoles.includes(actualRole)) {
            console.log("Authorization ✅");
            return next();
        }
        console.error("Authorization ❌");
        return res.status(403).json({ error: 'Forbidden' }); // to do use api util  
       
    }
    
}

export {authenticateJWT, authorizeRole};