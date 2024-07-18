// import jwt from 'jsonwebtoken';

// export const isLoggedIn = (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if (!token) {
//             return res.status(401).json({ message: 'Auth Error' });
//         }
//         const decoded = jwt.verify(token, 'your-secret-key');
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: 'Auth Error' });
//     }
// }

// export const isAdmin = (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if (!token) {
//             return res.status(401).json({ message: 'Auth Error' });
//         }
//         const decoded = jwt.verify(token, 'your-secret-key');
//         if (decoded.role === 'admin') {
//             next();
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: 'Auth Error' });
//     }
// }

// export default { isLoggedIn, isAdmin };

import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            console.log('No token found');
            return res.status(401).json({ message: 'Auth Error' });
        }
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        console.log('User decoded in isLoggedIn:', decoded);
        next();
    } catch (error) {
        console.error('Token verification failed in isLoggedIn:', error);
        return res.status(401).json({ message: 'Auth Error' });
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
        console.log('User is admin in isAdmin:', req.user);
        next();
    } else {
        console.log('User is not admin in isAdmin:', req.user);
        return res.status(403).json({ message: 'Forbidden' });
    }
}

export default { isLoggedIn, isAdmin };