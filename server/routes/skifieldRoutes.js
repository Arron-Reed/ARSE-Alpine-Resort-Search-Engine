"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skifieldModel_1 = require("../models/skifieldModel");
const router = express_1.default.Router();
// Get ALL Skifields
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSkifields = yield skifieldModel_1.SkifieldModel.find();
        res.status(200).json(allSkifields);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Search Bar for a skifield based on name
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.q;
        const searchSkifields = yield skifieldModel_1.SkifieldModel.find({
            name: { $regex: new RegExp(searchQuery, "i") }
        });
        res.status(200).json(searchSkifields);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Get One Skifield with :id in URL
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skifieldId = req.params.id;
    try {
        const getSkifield = yield skifieldModel_1.SkifieldModel.findOne({ _id: skifieldId });
        if (!getSkifield) {
            return res.status(404).json({ error: "Skifield not found" });
        }
        res.json(getSkifield);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
// Create a skifield (not logged in)
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skifield = req.body;
        const newSkifield = yield skifieldModel_1.SkifieldModel.create(skifield);
        res.status(201).json(newSkifield);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Skifield creation failed" });
    }
}));
// Update a skifield (not logged in)
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skifieldId = req.body.id;
        const updatedSkifield = req.body;
        const updatedRes = yield skifieldModel_1.SkifieldModel.findOneAndUpdate({ _id: skifieldId }, updatedSkifield, { new: true });
        if (!updatedRes) {
            return res.status(404).json({ error: "Skifield not found" });
        }
        res.status(202).json(updatedRes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Skifield update failed" });
    }
}));
exports.default = router;
