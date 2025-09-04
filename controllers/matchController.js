const Match = require("../models/matchModel");

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

module.exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate("organisateurId");
        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
