import express from 'express'
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';


const app = express();

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
    console.log('listening for requests on port 3000');
});

