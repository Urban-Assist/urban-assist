import jwt from "jsonwebtoken";

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    // Convert secret to Buffer to match Java's byte encoding
    const jwt_secret = Buffer.from("vaibhav", "utf-8");

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log("Received Token:", token);
    
    try {
        // Decode without verification first to debug
        const decoded_without_verification = jwt.decode(token, {complete: true});
        console.log("Token header:", decoded_without_verification?.header);
        console.log("Token payload:", decoded_without_verification?.payload);
        
        // Verify with Buffer-based secret
        const decoded = jwt.verify(token, jwt_secret, { algorithms: ['HS256'] });
        console.log("Decoded Token:", decoded);

        // Attach user data to request
        req.user = decoded;
        
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

function authorizeRole(expectedRole, actualRole) {
    return expectedRole === actualRole;
}

export default authenticateJWT;