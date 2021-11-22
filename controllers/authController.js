const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
	createUserToken: signJWT,
	verifyUserCredentials,
} = require("../utils/authUtils");

//to return a readable error message
function handleErrors(e) {
	//handle duplicates
	const code = e.code;
	if (code === 11000) return { duplicate: "Duplicate Email ID" };

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

		//gets the JWT token
		const jwtToken = signJWT({ email });

		//sets the response header with a value for the jwtToken
		res.header("auth-token", jwtToken).status(201).json({ jwtToken, user });

		console.log(id);
	} catch (e) {
		const errors = handleErrors(e);
		console.log(e);

		res.status(400).json(errors);
	}
}

async function signinController(req, res) {
	const { email, password } = req.body;

	try {
		//verify if user exists and the password is correct
		const result = await verifyUserCredentials({ email, password });
		switch (result) {
			case 0:
				res.status(400).send("Enter correct emailId");
				break;
			case 1:
				res.status(400).send("Enter correct password");
				break;
			case 2:
				//gets the JWT token
				const jwtToken = signJWT({ email });

				// sets the response header with a value for the jwtToken
				res.header("auth-token", jwtToken).status(200).json(jwtToken);
				break;
		}
	} catch (e) {
		console.log(e);
	}
}

module.exports = { signupController, signinController };
