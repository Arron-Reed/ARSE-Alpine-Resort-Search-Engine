import mongoose, {Schema, model} from "mongoose";

export interface IUser{
    _id: mongoose.Schema.Types.ObjectId
    email: string,
    username: string,
    password: string,
    role: string,
    image: string,
    favourites: string[],
    beenHere: string[],
    skifieldId: string,
}


const UserSchema = new Schema<IUser>(
    {
//      _id: mongoose.Schema.Types.ObjectId,   (Why does this stop me from adding a new customer? and getting user? )
        email: {type: String, required: [true, "Please add the user email address"], unique: true},
        username: {type: String, required: [true, "Please add the user name"]},
        password: {type: String, required: [true, "please add the user password"]},
        role: String,
        image: String,
        favourites: [String],
        beenHere: [String],
        skifieldId: String,
    },
);

export const UserModel = model("users", UserSchema);
export const FavouriteModel = model("users", UserSchema);