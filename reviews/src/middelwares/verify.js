import { publicKey } from "../app";
function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

export default authenticateJWT;