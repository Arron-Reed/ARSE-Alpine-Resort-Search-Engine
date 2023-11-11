"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./config/dbConnection");
const dotenv_1 = __importDefault(require("dotenv"));
const skifieldRoutes_1 = __importDefault(require("./routes/skifieldRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, dbConnection_1.connectDb)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("This is working");
});
app.use("/skifields", skifieldRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
