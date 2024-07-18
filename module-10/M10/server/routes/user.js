import express from 'express';
import { register, login, logout, updateprofile, getprofile } from '../controllers/user.js'; 
import { isAdmin, isLoggedIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/updateProfile', isLoggedIn, updateprofile);

router.get('/profile', isLoggedIn, getprofile);

router.get('/admin', isLoggedIn, isAdmin, (req, res) => {
    res.json({
        message: "Admin",
        user: req.user
    });
});


export default router;