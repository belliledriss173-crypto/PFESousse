const express = require("express");
const router = express.Router();
const terrainController = require("../controllers/terrainController");

router.post("/addTerrain", terrainController.addTerrain);
router.get("/getAllTerrains", terrainController.getAllTerrains);

module.exports = router;
