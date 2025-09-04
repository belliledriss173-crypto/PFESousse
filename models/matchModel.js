const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    dateHeure: { type: Date, required: true },
    lieu: { type: String, required: true },
    statut: { type: String, enum: ["en cours", "terminé"], default: "en cours" },
    organisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true }
}, { timestamps: true });

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
