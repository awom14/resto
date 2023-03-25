const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('users', {
	id: {
		type: DataTypes.STRING(36),
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING(255),
		unique: true,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	first_name: {
		type: DataTypes.STRING(50)
	},
	last_name: {
		type: DataTypes.STRING(50)
	},
	is_verified: {
		type: DataTypes.BOOLEAN
	},
	created_at: {
		type: DataTypes.DATE
	},
	updated_at: {
		type: DataTypes.DATE
	}
},
{
	underscored: true,
	timestamps: false
});

module.exports = User;