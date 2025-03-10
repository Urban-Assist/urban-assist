
import jwt from "jsonwebtoken";
function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    const jwt_secret = process.env.JWT_SECRET;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' }); // to do API error util use
    }

    try {
        const decoded = jwt.verify(token, jwt_secret, { algorithms: ['RS256'] });
        
        //add the decoded token as user in the request
        req.user = decoded; // Attach user data to request
        next();
    } catch (er) {
        return res.status(401).json({ error:er }); // use API error util
    }
}

export default authenticateJWT;

// to do : add the fucntion to check the role of the user. and allow id the role user has matches the expected role.