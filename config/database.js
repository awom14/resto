const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	logging: false
});

sequelize.authenticate().then(() => {
	console.log(`connected to the database.`)
}).catch((error) => {
	console.log(`error connecting to the database: ${error}`)
});

module.exports = sequelize;