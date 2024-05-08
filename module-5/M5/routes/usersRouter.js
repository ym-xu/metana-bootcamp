import express from 'express'

import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {

    const { name, email, role } = req.body;
    console.log("route register");
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        console.log("add new user");
        const newUser = new User({ name, email, role });
        await newUser.save();
        console.log("user added");
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

export default router;
