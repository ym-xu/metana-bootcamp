import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

console.log(process.env.db_user, process.env.db_psword, process.env.db_host, process.env.db_port, process.env.db_name);

const sequelize = new Sequelize(`postgres://${process.env.db_user}:${process.env.db_psword}@${process.env.db_host}:${process.env.db_port}/${process.env.db_name}` , {dialect: 'postgres', logging: false});

export default sequelize;