const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../config/model');
const { v4: uuidv4 } = require('uuid');
const controller = {};

dotenv.config();

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

		const token = jwt.sign({
			id: getUser.id,
			email: getUser.email,
			password: getUser.password,
			first_name: getUser.first_name,
			last_name: getUser.last_name,
			is_verified: getUser.is_verified,
			created_at: getUser.created_at,
			updated_at: getUser.updated_at,
			role: getUser.role
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1h'
		});

		const decoded = jwt.decode(token);

		res.status(200).json({message: `Logged in successfully.`, token: token, decoded: decoded});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: `An error occurred when logging in.`});
	}
};

module.exports = controller;