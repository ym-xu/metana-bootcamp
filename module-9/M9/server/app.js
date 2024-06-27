import express from 'express'
import sequelize from './config/db.js';
import authRoutes from './routes/user.js';
import blogRoutes from './routes/blog.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const checkDbStatus = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection failed");
    }
};

checkDbStatus();

app.listen(3001, 'localhost', () =>{
    console.log('listening for requests on port 3001');
});

