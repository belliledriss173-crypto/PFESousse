const mongoose = require("mongoose")

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb+srv://Sousse:HDqzi3QYb4AGrIBF@cluster0.ibpsp9y.mongodb.net/").then(() => {
        console.log("connect ot db");
    })
        .catch((Error) => {
            console.log(Error);
        }
        )
}

