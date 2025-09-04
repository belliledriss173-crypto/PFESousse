const Reservation = require("../models/reservationModel");

module.exports.addReservation = async (req, res) => {
    try {
        const { dateHeure, joueurId, terrainId, matchId } = req.body;
        const reservation = new Reservation({ dateHeure, joueurId, terrainId, matchId });
        const addedReservation = await reservation.save();
        res.status(200).json({ addedReservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("joueurId")
            .populate("terrainId")
            .populate("matchId");
        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
