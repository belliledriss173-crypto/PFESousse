const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 12 },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    age: Number,
    user_Image: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    isBanned: { type: Boolean, default: false },


owners:{type : mongoose.Schema.Types.ObjectId,ref:'player'},//one
//owners:{type : mongoose.Schema.Types.ObjectId,ref:'player'}//many


}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
