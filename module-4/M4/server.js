import http from 'http';
import fs from 'fs';
// import _ from 'lodash';
import express from 'express';
import mongoose from 'mongoose';
import blogsRouter from "./routes/blogsRouter.js";
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@m4.sdxiz04.mongodb.net/m4-assignment?retryWrites=true&w=majority&appName=M4`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

app.use("/api/blogs", blogsRouter);

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
});

app.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000');
});
