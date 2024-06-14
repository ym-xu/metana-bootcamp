import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        console.log(name, email, password);
        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        console.log(user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            },
            'your-secret-key', 
            { expiresIn: '1h' }
        );

        console.log('token in login:', token);

        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600000}).json({ token });

    } catch (error) {   
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).json({ message: 'User logged out successfully' });
});

export default router;


