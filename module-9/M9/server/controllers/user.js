import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const register = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

const logout = async (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).json({ message: 'User logged out successfully' });
};

const updateprofile = async (req, res) => {
    console.log('updateProfile');
    const { userId, username, email, first_name, last_name, description } = req.body;
    console.log(userId, username, email);
    try {
        const user = await User.findOne({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await user.update({
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            description: description
        });

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getprofile = async (req, res) => {
    console.log('get profile');
    try {
        const email = req.user.email;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ username: user.username, email: user.email, first_name: user.first_name, last_name: user.last_name, description: user.description, id: user.id});
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    register,
    login,
    logout,
    updateprofile,
    getprofile,
};