const mongoose = require("mongoose")

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.url_db).then(() => {
        console.log("connect ot db ");
    })
        .catch((Error) => {
            console.log(Error);
        }
        )
}
