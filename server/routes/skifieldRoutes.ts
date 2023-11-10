import express, { Request, Response } from "express";
import { SkifieldModel, ISkifield } from "../models/skifieldModel";

const router = express.Router();

// Get ALL Skifields
router.get("/", async (req: Request, res: Response) => {
    try {
        const allSkifields = await SkifieldModel.find();
        res.status(200).json(allSkifields);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Search Bar for a skifield based on name
router.get("/search", async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q as string;
        const searchSkifields = await SkifieldModel.find({
            name: { $regex: new RegExp(searchQuery, "i") }
        });
        res.status(200).json(searchSkifields);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get One Skifield with :id in URL
router.get("/:id", async (req: Request, res: Response) => {
    const skifieldId = req.params.id;
    try {
        const getSkifield = await SkifieldModel.findOne({_id: skifieldId});
        if (!getSkifield) {
            return res.status(404).json({ error: "Skifield not found"});
        }
        res.json(getSkifield);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


// Create a skifield (not logged in)
router.post("/create", async (req: Request, res: Response) => {
    try {
        const skifield = req.body as ISkifield;
        const newSkifield = await SkifieldModel.create(skifield);
        res.status(201).json(newSkifield); 
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Skifield creation failed" });
    }
});


// Update a skifield (not logged in)
router.put("/update", async (req: Request, res: Response) => {
    try {
        const skifieldId = req.body.id
        const updatedSkifield = req.body as ISkifield;
        const updatedRes = await SkifieldModel.findOneAndUpdate({ _id: skifieldId }, updatedSkifield, { new: true });

        if (!updatedRes) {
            return res.status(404).json({ error: "Skifield not found"});
        }
        res.status(202).json(updatedRes);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Skifield update failed" });
    }
});


export default router;