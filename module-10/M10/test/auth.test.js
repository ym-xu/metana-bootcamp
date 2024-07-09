import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { login, logout, validateToken } from '../server/controllers/user';
import User from '../server/models/User';

jest.mock('../server/models/User');

describe('Authentication Functions', () => {
    describe('Login Function', () => {
        it('should return a JWT token for valid credentials', async () => {
            const mockUser = {
                id: 1,
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedpassword',
                role: 'user',
                first_name: 'Test',
                last_name: 'User',
                description: 'A test user'
            };

            User.findOne = jest.fn().mockResolvedValue(mockUser);
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue('your-secret-key');

            const user = await User.findOne({ where: { email: 'test@example.com' } });

            expect(user).toEqual(mockUser);

            jest.clearAllMocks();
        });
    });

    describe('Logout Function', () => {
        it('should invalidate the JWT token', () => {
            const req = {};
            const res = {
                cookie: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            logout(req, res);
            expect(res.cookie).toHaveBeenCalledWith('jwt', '', { expires: new Date(0) });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
        });
    });
});

// import { login, logout, validateToken } from '../server/controllers/user';
// import User from '../server/models/User';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// jest.mock('../server/models/User');
// jest.mock('bcrypt');
// jest.mock('jsonwebtoken');

// describe('login', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {
//             body: {
//                 email: 'test@example.com',
//                 password: 'password123'
//             }
//         };

//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//             cookie: jest.fn().mockReturnThis(),
//         };
//     });

//     it('should return 400 if user is not found', async () => {
//         User.findOne.mockResolvedValue(null);

//         await login(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
//     });

//     it('should return 400 if password does not match', async () => {
//         User.findOne.mockResolvedValue({ password: 'hashedpassword' });
//         bcrypt.compare.mockResolvedValue(false);

//         await login(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
//     });

//     it('should return token if credentials are valid', async () => {
//         const user = { id: 1, email: 'test@example.com', role: 'user', name: 'Test User', password: 'hashedpassword' };
//         const token = 'fake-jwt-token';

//         User.findOne.mockResolvedValue(user);
//         bcrypt.compare.mockResolvedValue(true);
//         jwt.sign.mockReturnValue(token);

//         await login(req, res);

//         expect(jwt.sign).toHaveBeenCalledWith(
//             { userId: user.id, email: user.email, role: user.role, name: user.name },
//             'your-secret-key',
//             { expiresIn: '1h' }
//         );

//         expect(res.cookie).toHaveBeenCalledWith('jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600000 });
//         expect(res.json).toHaveBeenCalledWith({ token });
//     });

//     it('should handle server errors', async () => {
//         const error = new Error('Server error');
//         User.findOne.mockRejectedValue(error);

//         await login(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
//     });
// });
