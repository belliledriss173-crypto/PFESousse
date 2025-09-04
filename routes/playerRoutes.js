const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post("/addPlayer", playerController.addPlayer);
router.get("/getAllPlayers", playerController.getAllPlayers);
router.get("/getPlayerById/:id", playerController.getPlayerById);

module.exports = router;
