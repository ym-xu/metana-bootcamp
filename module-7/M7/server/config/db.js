import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://db_user:135256@localhost:5432/portfolio' , {dialect: 'postgres', logging: false});


export default sequelize;