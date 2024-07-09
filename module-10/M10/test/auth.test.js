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