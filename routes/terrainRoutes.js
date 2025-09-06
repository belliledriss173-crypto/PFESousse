const express = require("express");
const router = express.Router();
const terrainController = require("../controllers/terrainController");

router.post("/addTerrain", terrainController.addTerrain);
router.get("/getAllTerrains", terrainController.getAllTerrains);
router.delete("/deleteTerrainById", terrainController.deleteTerrainById);
router.get("/getTerrainById", terrainController.getTerrainById);
router.patch("/updateTerrainById", terrainController.updateTerrainById);






module.exports = router;
