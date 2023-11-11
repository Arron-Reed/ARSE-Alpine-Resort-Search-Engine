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
const userModel_1 = require("../models/userModel");
const skifieldModel_1 = require("../models/skifieldModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyTokenMiddleware_1 = __importDefault(require("../middleware/VerifyTokenMiddleware"));
const router = express_1.default.Router();
// Get all users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userModel_1.UserModel.find();
        res.status(200).json(allUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching user data" });
    }
}));
// Get One specific User with UserId in URL
router.get("/:id", VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const getUser = yield userModel_1.UserModel.findOne({ _id: userId });
        if (!getUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(getUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
// Register new user, checks if the email address is taken, then hashes the password and registers the user.
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        ;
        const userAvailable = yield userModel_1.UserModel.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered");
        }
        ;
        const hashedPassword = yield bcrypt_1.default.hash(password, 1);
        console.log("Hashed password: ", hashedPassword);
        const user = yield userModel_1.UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: "Registered User"
        });
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email, role: user.role });
            // #?   Should I return this info? Security? */
        }
        else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "User registration failed" });
    }
}));
// Login a user, 
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.UserModel.findOne({ email: req.body.email });
    try {
        if (user == null) {
            res.send("Invalid email or password");
        }
        else {
            const valid = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (valid) {
                const userForHashing = {
                    email: user.email,
                    password: user.password
                };
                const accessToken = jsonwebtoken_1.default.sign(userForHashing, "secret");
                res.json({ accessToken: accessToken, userId: user._id });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "User login failed" });
    }
}));
router.post('/savefavourite', VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.body.userId;
    const skifieldId = req.body.skifieldId;
    try {
        const user = yield userModel_1.UserModel.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.favourites.includes(skifieldId)) {
            return res.status(400).json({ error: "Skifield already in favorites" });
        }
        user.favourites.push(skifieldId);
        yield user.save();
        res.status(200).json({ message: "Favorites saved successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred when saving favorites" });
    }
}));
router.get("/favourites/:userId", VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield userModel_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const favourites = user.favourites;
        const favoriteSkifields = yield skifieldModel_1.SkifieldModel.find({ _id: { $in: favourites } });
        res.status(200).json({ favourites: favoriteSkifields });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
// Remove Skifield from Users Favourite list (Private)
router.delete("/favourites/:userId/:skifieldId", VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, skifieldId } = req.params;
    try {
        const user = yield userModel_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.favourites.includes(skifieldId)) {
            return res.status(404).json({ error: "Skifield not found in user's favourite list" });
        }
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, { $pull: { favourites: skifieldId } }, { new: true });
        res.json({ message: "Skifield removed from favourites", user: updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
router.post('/beenhere', VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.body.userId;
    const skifieldId = req.body.skifieldId;
    try {
        const user = yield userModel_1.UserModel.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.beenHere.includes(skifieldId)) {
            return res.status(400).json({ error: "Skifield already marked as been-here" });
        }
        user.beenHere.push(skifieldId);
        yield user.save();
        res.status(200).json({ message: "Been Here saved successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred when saving been here" });
    }
}));
router.get("/beenhere/:userId", VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield userModel_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const beenhere = user.beenHere;
        const beenhereSkifields = yield skifieldModel_1.SkifieldModel.find({ _id: { $in: beenhere } });
        res.status(200).json({ beenhere: beenhereSkifields });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
// Remove Skifield from Users BeenHere list (Private)
router.delete("/beenhere/:userId/:skifieldId", VerifyTokenMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, skifieldId } = req.params;
    try {
        const user = yield userModel_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.beenHere.includes(skifieldId)) {
            return res.status(404).json({ error: "Skifield not found in user's been here list" });
        }
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, { $pull: { beenHere: skifieldId } }, { new: true });
        res.json({ message: "Skifield removed from been here list", user: updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
exports.default = router;
