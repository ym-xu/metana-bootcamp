import { DataTypes } from "sequelize";
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    id: {   
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
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
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'user'
    },
    first_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {tableName:'users'});
User.sync({ alter: true });

export default User;
