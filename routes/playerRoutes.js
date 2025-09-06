const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post("/addPlayer", playerController.addPlayer);
router.post("/addPlayerWithOwner/:id", playerController.addPlayerWithOwner);
router.get("/getAllPlayers", playerController.getAllPlayers);
router.get("/getPlayerById/:id", playerController.getPlayerById);
router.patch("/updatePlayerById/:id", playerController.updatePlayerById);
router.delete("/deletePlayerById/:id", playerController.deletePlayerById);


module.exports = router;
