import mongoose, {Schema, model} from "mongoose";

export interface ISkifield{
    _id: string,
    name: string,
    country: string,
    url: string,
    region: string,
    lan: string,
    elevation: string,
    topToBottom: number,
    highest: number,
    lowest: number,
    totalSlopes: number,
    blueSlopes: number,
    redSlopes: number,
    blackSlopes: number,
    skiLifts: number,
    image: string,
    trailMap: string,
    description: string,
    rating: number,
    adultSkiPass: number,
    youthSkiPass: number,
    generalSeason: string,
    openingTimes: string,
    nearbyTown1: string,
    nearbyTown2: string,
    lat: number,
    lng: number,
    position: {
        lat: number,
        lng: number
    }
    user_id: string,
    favouriteSkifields: [string],
}

const SkifieldSchema = new Schema<ISkifield>({

    name: {type: String, required: [true, "Please add the skifield name"]},
    country: {type: String, required: [true, "Please add the country"]}, 
    url: String, 
    region: String,
    lan: String,
    elevation: String,
    highest: Number,
    lowest: Number,
    topToBottom: Number,
    totalSlopes: Number,
    blueSlopes: Number,
    redSlopes: Number,
    blackSlopes: Number,
    skiLifts: Number,
    image: String,
    trailMap: String,
    description: String,
    rating: Number,
    adultSkiPass: Number,
    youthSkiPass: Number,
    generalSeason: String,
    openingTimes: String,
    nearbyTown1: String,
    nearbyTown2: String,
    lat: Number,
    lng: Number,
//    user_id: {type: String, required: [true, "Please add the logged in users id"], ref: "user" },
    
});

export const SkifieldModel = model("skifields", SkifieldSchema);