const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routers/authRoutes");
const verifiedRoutes = require("./routers/verifiedRoutes");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

(async () => {
	try {
		const connection = await mongoose.connect(URI);

		console.log("conneted to db");
	} catch (e) {
		console.log(e);
	}
})();

//middlewares
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/verified", verifiedRoutes);

app.get("/", (req, res) => {
	res.send("Let's start");
});

app.listen(PORT || 3000, () => {
	console.log(`connected to port ${PORT}`);
});
