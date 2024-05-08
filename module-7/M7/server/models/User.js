// import mongoose from "mongoose";
import { DataTypes } from "sequelize";
import sequelize from '../config/db.js';

// const Schema = mongoose.Schema;

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
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {tableName:'users'});
User.sync({ alter: true });

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const User = mongoose.model('User', userSchema);

export default User;
