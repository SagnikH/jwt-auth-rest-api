const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			index: true,
			//custom validation
			validate: [isEmail, "Enter a valid email"],
		},
		password: {
			type: String,
			required: true,
			minlength: [5, "Password must be atleast length 5"],
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ strict: true }
);

module.exports = mongoose.model("testusers", userSchema);
