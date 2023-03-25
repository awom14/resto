const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('resto', 'awom', 'password', {
	host: '172.31.16.1',
	dialect: 'mysql',
	logging: false
});

sequelize.authenticate().then(() => {
	console.log(`connected to the database.`)
}).catch((error) => {
	console.log(`error connecting to the database: ${error}`)
});

module.exports = sequelize;