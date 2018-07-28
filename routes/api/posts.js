const express = require("express");
const router = express.Router();

// @route  GET api/posts/test
// @desc   Test post router
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Post Work" }));

module.exports = router;
