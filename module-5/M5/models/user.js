// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
}, {tableName:'user_m5', createdAt: false, updatedAt: false});
User.sync({ alter: true });

export default User;
