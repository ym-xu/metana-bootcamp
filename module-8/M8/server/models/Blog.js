import { DataTypes } from "sequelize";
import sequelize from '../config/db.js';

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

export default Blog;