const mongoose = require("mongoose");

const terrainSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    capacite: { type: Number, required: true }
}, { timestamps: true });

const Terrain = mongoose.model("Terrain", terrainSchema);
module.exports = Terrain;
