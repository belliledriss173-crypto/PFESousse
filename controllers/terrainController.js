const Terrain = require("../models/terrainModel");

// Ajouter un terrain
module.exports.addTerrain = async (req, res) => {
    try {
        const { nom, adresse, capacite } = req.body;
        const terrain = new Terrain({ nom, adresse, capacite });
        const addedTerrain = await terrain.save();
        res.status(200).json({ addedTerrain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer tous les terrains
module.exports.getAllTerrains = async (req, res) => {
    try {
        const terrains = await Terrain.find();
        res.status(200).json({ terrains });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
