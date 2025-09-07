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

module.exports.addPlayerWithOwner = async (req, res) => {
    try {
        const playerData = req.body;
        const idOwner = req.params.id;

        // userId pour la validation Mongoose
        playerData.userId = idOwner;
        playerData.owner = idOwner;

        const user = await User.findById(idOwner);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const player = new Player(playerData);
        const addedPlayer = await player.save();

        await User.findByIdAndUpdate(idOwner, {
            //$set :{player:addedPlayer._id}
            $push: { players: addedPlayer._id }
        });

        res.status(200).json({ addedPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



// Mettre à jour un joueur par ID (PATCH)
module.exports.updatePlayerById = async (req, res) => {
    try {
        const id = req.params.id;        // ID du player à modifier
        const updates = req.body;         // Les champs à mettre à jour

        // Vérifier ID valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        // Mettre à jour le player
        const updatedPlayer = await Player.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedPlayer) {
            return res.status(404).json({ message: "Joueur non trouvé" });
        }

        res.status(200).json({ updatedPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// Supprimer un joueur par ID
module.exports.deletePlayerById = async (req, res) => {
    try {
        const id = req.params.id;

        // Vérifier ID valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        // Supprimer le joueur
        const deletedPlayer = await Player.findByIdAndDelete(id);

        if (!deletedPlayer) {
            return res.status(404).json({ message: "Joueur non trouvé" });
        }

        // Supprimer le player de la liste players du owner
        await User.findByIdAndUpdate(deletedPlayer.owner, {
            $pull: { players: deletedPlayer._id }
        });

        res.status(200).json({ message: "Joueur supprimé avec succès", deletedPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




