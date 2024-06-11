import express from 'express'
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import middleware from './middleware/authmiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use(middleware);

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
    console.log('listening for requests on port 3000');
});

