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

/*
	https://stackoverflow.com/a/10167170/13962659
	to apply secondary index with an unique constraint
	add; unique : true and index : true -> two properties and {strict : true}

	error object has a property of code === 11000 => duplicates
*/
