import express, {Request, Response} from "express";
import {connectDb} from "./config/dbConnection";
import dotenv from "dotenv";
import skifieldRoutes from "./routes/skifieldRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

dotenv.config();
connectDb();
const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("This is working")
});

app.use("/skifields", skifieldRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});