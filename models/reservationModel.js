const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    dateHeure: { type: Date, required: true },
    statut: { type: String, enum: ["confirmée", "annulée"], default: "confirmée" },
    joueurId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    terrainId: { type: mongoose.Schema.Types.ObjectId, ref: "Terrain", required: true },
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match" }
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
