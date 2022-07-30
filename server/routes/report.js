const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {});

module.exports = router;
