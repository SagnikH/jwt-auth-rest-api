const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const createUserToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);

	return token;
};

const verifyUserCredentials = async ({ email, password }) => {
	//finding if emailId exists
	const user = await User.findOne({ email });
	if (!user) return 0;

	//checking if password is correct
	const flag = await bcrypt.compare(password, user.password);
	if (!flag) return 1;

	console.log(user);
	return 2;
};

module.exports = { createUserToken, verifyUserCredentials };
