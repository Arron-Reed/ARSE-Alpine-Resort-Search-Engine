"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkifieldModel = void 0;
const mongoose_1 = require("mongoose");
const SkifieldSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Please add the skifield name"] },
    country: { type: String, required: [true, "Please add the country"] },
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
exports.SkifieldModel = (0, mongoose_1.model)("skifields", SkifieldSchema);
