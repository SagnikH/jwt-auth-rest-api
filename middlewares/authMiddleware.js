const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
	const jwtToken = req.query["auth-token"];
	console.log(jwtToken);

	if (jwtToken) {
		try {
			const decoded = jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY);
			console.log(decoded);

			//passing control to the next middleware or we could had even redirected user to a route aswell
			next();
		} catch (e) {
			res.status(403).json(e);
		}
	} else {
		res.status(401).send("JWT token not available");
	}
};

module.exports = requireAuth;
