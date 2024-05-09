
import http from 'http';
import fs from 'fs';
import express from 'express';
// import mongoose from 'mongoose';
import sequelize from './config/db.js';
import usersRouter from './routes/usersRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// const dbURI = 'mongodb+srv://yimingxu96:UC0tdVisA3LkRhml@m4.sdxiz04.mongodb.net/m4-assignment?retryWrites=true&w=majority&appName=M4'
// Connect to MongoDB
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
});

// Routes
app.use('/api/users', usersRouter);

const checkDbStatus = async () => {
  try {
      await sequelize.authenticate();
      console.log("Database connection successful");
  } catch (error) {
      console.log("Database connection failed");
  }
};

checkDbStatus();

// Start the server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
