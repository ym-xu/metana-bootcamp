import express from 'express'
import sequelize from '../config/db.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {

    const { name, email, role } = req.body;
    console.log({ name, email, role });
    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM user_m5 WHERE email = ?", {
            replacements: [email],
            type: sequelize.QueryTypes.SELECT
        });
        console.log("raw query result: ", results);
        if (results) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        console.log("add new user");

        const [newUser, created] = await sequelize.query("INSERT INTO user_m5 (name, email, role) VALUES (?, ?, ?)", {
            replacements: [name, email, role],
            type: sequelize.QueryTypes.INSERT
        });

        console.log(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

router.get('/allusers', async (req, res) => {
    try {
        // const users = await User.find();
        const users = await sequelize.query("SELECT * FROM user_m5", { type: sequelize.QueryTypes.SELECT });
        console.log("raw query result: ", users);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the users' });
    }
});


export default router;
