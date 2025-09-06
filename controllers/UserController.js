const userModel = require("../models/userModel")

module.exports.esmFonction = async (req, res) => {
    try {
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.getAllUsers = async (req, res) => {
    try {
        const usersList = await userModel.find()

        res.status(200).json({ usersList })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




module.exports.getUserById = async (req, res) => {
    try {

        const id = req.params.id
        const user = await userModel.findById(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getUserByAge = async (req, res) => {
    try {

        const age = req.params.age
        const user = await userModel.find({ age: age })
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.addClient = async (req, res) => {
    try {
        const { firstName, lastName, email, age, password } = req.body; // ajoute password
        const role = "client";

        const user = new userModel({ firstName, lastName, email, age, role, password });
        const addedUser = await user.save();

        console.log(req.body);
        res.status(200).json({ addedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.deleteUserbyId = async (req, res) => {
    try {

        const id = req.params.id
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports.addClientWithImage = async (req, res) => {
    try {
        const userDate = req.body;
        userDate.role = "client";

if(req.file){
    const {filename}=req.file
userDate.user_image= filename
}
        const user = new userModel(userDate);
        const addedUser = await user.save();

        console.log(req.body);
        res.status(200).json({ addedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body; // les champs à mettre à jour

        // { new: true } => renvoie l'utilisateur mis à jour
        const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
