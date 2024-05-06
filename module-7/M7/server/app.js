import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

connectDB();

app.listen(3001, 'localhost', () =>{
    console.log('listening for requests on port 3000');
});

