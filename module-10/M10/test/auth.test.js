import { login, logout, updateprofile, getprofile } from '../server/controllers/user';
import User from '../server/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

jest.mock('../server/models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('login', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnThis(),
        };
    });

    it('should return 400 if user is not found', async () => {
        User.findOne.mockResolvedValue(null);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 400 if password does not match', async () => {
        User.findOne.mockResolvedValue({ password: 'hashedpassword' });
        bcrypt.compare.mockResolvedValue(false);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return token if credentials are valid', async () => {
        const user = { id: 1, email: 'test@example.com', role: 'user', name: 'Test User', password: 'hashedpassword' };
        const token = 'fake-jwt-token';

        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue(token);

        await login(req, res);

        expect(jwt.sign).toHaveBeenCalledWith(
            { userId: user.id, email: user.email, role: user.role, name: user.name },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        expect(res.cookie).toHaveBeenCalledWith('jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600000 });
        expect(res.json).toHaveBeenCalledWith({ token });
    });

    it('should handle server errors', async () => {
        const error = new Error('Server error');
        User.findOne.mockRejectedValue(error);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
});

describe('logout', () => {
    let req, res;

    beforeEach(() => {
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnThis(),
        };
    });

    it('should clear the jwt cookie and return a success message', async () => {
        await logout(req, res);

        expect(res.cookie).toHaveBeenCalledWith('jwt', '', { expires: new Date(0) });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
    });

});

describe('updateprofile', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                userId: 1,
                username: 'newUsername',
                email: 'newemail@example.com',
                first_name: 'NewFirstName',
                last_name: 'NewLastName',
                description: 'New description'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 404 if user is not found', async () => {
        User.findOne.mockResolvedValue(null);

        await updateprofile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should update the user and return success message', async () => {
        const user = {
            update: jest.fn().mockResolvedValue({
                id: 1,
                username: 'newUsername',
                email: 'newemail@example.com',
                first_name: 'NewFirstName',
                last_name: 'NewLastName',
                description: 'New description'
            })
        };

        User.findOne.mockResolvedValue(user);

        await updateprofile(req, res);

        expect(user.update).toHaveBeenCalledWith({
            username: 'newUsername',
            email: 'newemail@example.com',
            first_name: 'NewFirstName',
            last_name: 'NewLastName',
            description: 'New description'
        });

        expect(res.json).toHaveBeenCalledWith({
            message: 'User updated successfully',
            user: {
                id: 1,
                username: 'newUsername',
                email: 'newemail@example.com',
                first_name: 'NewFirstName',
                last_name: 'NewLastName',
                description: 'New description'
            }
        });
    });

    it('should handle server errors', async () => {
        const error = new Error('Server error');
        User.findOne.mockRejectedValue(error);

        await updateprofile(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
});

describe('getprofile', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                email: 'test@example.com'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 404 if user is not found', async () => {
        User.findOne.mockResolvedValue(null);

        await getprofile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return user profile if user is found', async () => {
        const user = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            description: 'This is a test user.'
        };

        User.findOne.mockResolvedValue(user);

        await getprofile(req, res);

        expect(res.json).toHaveBeenCalledWith({
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            description: user.description,
            id: user.id
        });
    });

    it('should handle server errors', async () => {
        const error = new Error('Server error');
        User.findOne.mockRejectedValue(error);

        await getprofile(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
});