import request from 'supertest';
import app from '../app';
import User from '../models/User.js';

let token;

beforeAll(async () => {
    await User.destroy({ where: {} });
});

describe('User API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testusesdcsr1',
                email: 'test@exaascasdadampl1e.com',
                password: 'passwor1d123'
            });
        console.log('Register a response:', res.body); 
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@exaascasdadampl1e.com',
                password: 'passwor1d123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should logout a user', async () => {
        const res = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User logged out successfully');
    });
});