import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Auth Error' });
        }
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Auth Error' });
    }
}

export const isAdmin = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Auth Error' });
        }
        const decoded = jwt.verify(token, 'your-secret-key');
        if (decoded.role === 'admin') {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Auth Error' });
    }
}

export default { isLoggedIn, isAdmin };