const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//to return a readable error message
function handleErrors(e) {
	const error = e.errors;
	let errorMessages = { email: "", password: "", name: "" };

	if ("email" in error) errorMessages.email = error.email.message;

	if ("password" in error) errorMessages.password = error.password.message;

	if ("name" in error) errorMessages.name = error.name.message;

	return errorMessages;
}

async function signupController(req, res) {
	const { email, password, name } = req.body;
	//res.json(req.body);

	try {
		//hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ email, password: hashedPassword, name });
		const id = user._id.toString(); //to extract the unqiue id from each newly created document

		res.status(201).json(user);
		console.log(id);
	} catch (e) {
		const errors = handleErrors(e);

		res.status(400).json(errors);
		console.log(e);
	}
}

function signinController(req, res) {}

module.exports = { signupController, signinController };
