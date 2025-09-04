const Player = require("../models/playerModel");
const User = require("../models/userModel");

// Ajouter un joueur
module.exports.addPlayer = async (req, res) => {
    try {
        const { userId, niveau, positionPreferee } = req.body;

        // Vérifier que l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const player = new Player({ userId, niveau, positionPreferee });
        const addedPlayer = await player.save();
        res.status(200).json({ addedPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer tous les joueurs
module.exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate("userId");
        res.status(200).json({ players });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un joueur par ID
module.exports.getPlayerById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const player = await Player.findById(id).populate("userId");
        if (!player) return res.status(404).json({ message: "Joueur non trouvé" });

        res.status(200).json({ player });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
