
import http from 'http';
import fs from 'fs';
import express from 'express';
import sequelize from './config/db.js';
import usersRouter from './routes/usersRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

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
