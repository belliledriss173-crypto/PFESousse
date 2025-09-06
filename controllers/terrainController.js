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

// Récupérer un terrain par ID
module.exports.getTerrainById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const terrain = await Terrain.findById(id);
        if (!terrain) return res.status(404).json({ message: "Terrain non trouvé" });

        res.status(200).json({ terrain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un terrain par ID
module.exports.updateTerrainById = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updatedTerrain = await Terrain.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTerrain) return res.status(404).json({ message: "Terrain non trouvé" });

        res.status(200).json({ updatedTerrain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un terrain par ID
module.exports.deleteTerrainById = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedTerrain = await Terrain.findByIdAndDelete(id);
        if (!deletedTerrain) return res.status(404).json({ message: "Terrain non trouvé" });

        res.status(200).json({ message: "Terrain supprimé avec succès", deletedTerrain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
