const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    niveau: { type: String, required: true },
    positionPreferee: { type: String, required: true },
   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},  { timestamps: true });




const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
