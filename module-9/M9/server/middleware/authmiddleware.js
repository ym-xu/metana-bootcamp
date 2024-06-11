import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log('token: ------------------ :', token);
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
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    else {
        return res.status(403).json({ message: 'Forbidden error' });
    }
}

export default { isLoggedIn, isAdmin };