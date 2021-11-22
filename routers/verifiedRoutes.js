const router = require("express").Router();
const requireAuth = require("../middlewares/authMiddleware");

router.get("/", requireAuth, (req, res) => {
	res.status(200).send("Acessing verified route");
});

module.exports = router;
