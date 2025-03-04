import { publicKey } from "../utils/FetchPK.js";
import jwt from "jsonwebtoken";
function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' }); // to do API error util use
    }

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        
        //add the decoded token as user in the request
        req.user = decoded; // Attach user data to request
        next();
    } catch (er) {
        return res.status(401).json({ error:er }); // use API error util
    }
}

export default authenticateJWT;