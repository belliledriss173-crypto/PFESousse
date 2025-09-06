const Reservation = require("../models/reservationModel");

// Ajouter une réservation
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

// Récupérer toutes les réservations
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

// Récupérer une réservation par ID
module.exports.getReservationById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const reservation = await Reservation.findById(id)
            .populate("joueurId")
            .populate("terrainId")
            .populate("matchId");

        if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });

        res.status(200).json({ reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une réservation par ID
module.exports.updateReservationById = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updatedReservation = await Reservation.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedReservation) return res.status(404).json({ message: "Réservation non trouvée" });

        res.status(200).json({ updatedReservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une réservation par ID
module.exports.deleteReservationById = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) return res.status(404).json({ message: "Réservation non trouvée" });

        res.status(200).json({ message: "Réservation supprimée avec succès", deletedReservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
