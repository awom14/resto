const bcrypt = require('bcrypt');
const User = require('../config/model');
const { v4: uuidv4 } = require('uuid');
const controller = {};

controller.createUser = async (req, res) => {
	const { email, password, first_name, last_name } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const payload = {
		id: uuidv4(),
		email: email,
		password: hashedPassword,
		first_name: first_name,
		last_name: last_name
	};

	try {
		await User.create(payload);

		res.status(201).json({message: `User created successfully.`});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: `An error occurred while creating the user.`});
	}
};

controller.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const getUser = await User.findOne({where: {email: email}});

		if (!getUser) {
			return res.status(401).json({message: `Invalid email or password.`});
		}

		const passwordMatch = await bcrypt.compare(password, getUser.password);

		if (!passwordMatch) {
			return res.status(401).json({message: `Invalid email or password.`});
		}

		res.status(200).json({message: `Logged in successfully.`});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: `An error occurred when logging in.`});
	}
};

module.exports = controller;