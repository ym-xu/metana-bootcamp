// import mongoose from "mongoose";
import { DataTypes } from "sequelize";
import sequelize from '../config/db.js';

// const Schema = mongoose.Schema;

const Blog = sequelize.define('Blog', {
    id: {   
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {tableName:'blogs'});
Blog.sync({ alter: true });

// const blogSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//       }
// });

// const Blog = mongoose.model('Blog', blogSchema);

export default Blog;