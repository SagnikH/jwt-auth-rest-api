const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
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
});

module.exports = mongoose.model("testusers", userSchema);
