const mongoose = require("mongoose");
const User = require("../models/user");

async function signupController(req, res) {
	const { email, password, name } = req.body;
	res.json(req.body);

	try {
		const user = await User.create({ email, password, name });
		const id = user._id.toString();

		console.log(id);
	} catch (e) {
		console.log(e);
	}
}

function signinController(req, res) {}

module.exports = { signupController, signinController };
