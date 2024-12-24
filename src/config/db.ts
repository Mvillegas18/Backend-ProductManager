import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';

const db = new Sequelize(`${process.env.EXTERNAL_DB}`, {
	models: [__dirname + '/../models/**/*'],
	logging: false,
});

export default db;
