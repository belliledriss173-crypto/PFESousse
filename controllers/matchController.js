const Match = require("../models/matchModel");

// Ajouter un match
module.exports.addMatch = async (req, res) => {
    try {
        const { dateHeure, lieu, organisateurId } = req.body;
        const match = new Match({ dateHeure, lieu, organisateurId });
        const addedMatch = await match.save();
        res.status(200).json({ addedMatch });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer tous les matchs
module.exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate("organisateurId");
        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un match par ID
module.exports.getMatchById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const match = await Match.findById(id).populate("organisateurId");
        if (!match) return res.status(404).json({ message: "Match non trouvé" });

        res.status(200).json({ match });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un match par ID
module.exports.updateMatchById = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updatedMatch = await Match.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMatch) return res.status(404).json({ message: "Match non trouvé" });

        res.status(200).json({ updatedMatch });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un match par ID
module.exports.deleteMatchById = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedMatch = await Match.findByIdAndDelete(id);
        if (!deletedMatch) return res.status(404).json({ message: "Match non trouvé" });

        res.status(200).json({ message: "Match supprimé avec succès", deletedMatch });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
