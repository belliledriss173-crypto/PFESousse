const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.post("/addMatch", matchController.addMatch);
router.get("/getAllMatches", matchController.getAllMatches);
router.get("/getMatchById/:id", matchController.getMatchById);
router.patch("/updateMatchById/:id", matchController.updateMatchById);
router.delete("/updateMatchById/:id", matchController.deleteMatchById);

module.exports = router;
