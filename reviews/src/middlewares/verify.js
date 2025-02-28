import { publicKey } from "../app.js";
import jwt from "jsonwebtoken";
function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        req.user = decoded; // Attach user data to request
        next();
    } catch (er) {
        return res.status(401).json({ error:er });
    }
}

export default authenticateJWT;