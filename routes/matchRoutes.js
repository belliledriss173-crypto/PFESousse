const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.post("/addMatch", matchController.addMatch);
router.get("/getAllMatches", matchController.getAllMatches);

module.exports = router;
