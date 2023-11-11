"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    //      _id: mongoose.Schema.Types.ObjectId,   (Why does this stop me from adding a new customer? and getting user? )
    email: { type: String, required: [true, "Please add the user email address"], unique: true },
    username: { type: String, required: [true, "Please add the user name"] },
    password: { type: String, required: [true, "please add the user password"] },
    role: String,
    image: String,
    favourites: [String],
    beenHere: [String],
    skifieldId: String,
});
exports.UserModel = (0, mongoose_1.model)("users", UserSchema);
exports.FavouriteModel = (0, mongoose_1.model)("users", UserSchema);
