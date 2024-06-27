import express from 'express';
import controller from '../controllers/user.js';
import { isAdmin, isLoggedIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.put('/updateProfile', isLoggedIn, controller.updateprofile);

router.get('/profile', isLoggedIn, controller.getprofile);

router.get('/admin', isLoggedIn, isAdmin, (req, res) => {
    res.json({
        message: "Admin",
        user: req.user
    });
});


export default router;