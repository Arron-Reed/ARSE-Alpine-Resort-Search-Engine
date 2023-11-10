import express, { Request, Response } from "express";
import { UserModel, IUser } from "../models/userModel";
import { SkifieldModel, ISkifield } from "../models/skifieldModel";
import bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
import VerifyTokenMiddleware from "../middleware/VerifyTokenMiddleware"

const router = express.Router();


// Get all users
router.get("/", async (req: Request, res: Response) => {
    
    
    
    try {
        const allUsers = await UserModel.find();
        res.status(200).json(allUsers);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching user data" });
    }
});


// Get One specific User with UserId in URL
router.get("/:id", VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const getUser = await UserModel.findOne({ _id: userId });
        if (!getUser) {
            return res.status(404).json({ error: "User not found"});
        }
        res.json(getUser);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


// Register new user, checks if the email address is taken, then hashes the password and registers the user.
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as IUser;
        if(!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory")
        };

        const userAvailable = await UserModel.findOne({email});
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered")
        };
    
        const hashedPassword = await bcrypt.hash(password, 1);
        console.log("Hashed password: ", hashedPassword);

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: "Registered User"
        }); 

        if(user) {
            res.status(201).json({ _id: user.id, email: user.email, role: user.role });
// #?   Should I return this info? Security? */
        } else {
        res.status(400);
        throw new Error("User data is not valid");
        }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "User registration failed" });
    }
});


// Login a user, 
router.post("/login", async (req: Request, res: Response) => {
    const user = await UserModel.findOne({email: req.body.email});
    try {
        if (user == null) {
            res.send("Invalid email or password");
        }
        
        else{
        const valid = await bcrypt.compare(req.body.password, user.password);
        
            if(valid){ 
                const userForHashing = {
                    email: user.email,
                    password: user.password
                };

                const accessToken = jwt.sign(userForHashing, "secret");
                res.json({accessToken: accessToken, userId: user._id});
            }
        }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "User login failed" });
    }
});


router.post('/savefavourite', VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const _id = req.body.userId;
    const skifieldId = req.body.skifieldId
    
    try {
        const user = await UserModel.findById(_id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.favourites.includes(skifieldId)) {
            return res.status(400).json({ error: "Skifield already in favorites" }) 
        }
        
        user.favourites.push(skifieldId);

        await user.save();

        res.status(200).json({ message: "Favorites saved successfully" });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred when saving favorites" });
    }  
});


router.get("/favourites/:userId", VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById( userId );
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        const favourites = user.favourites;
        const favoriteSkifields = await SkifieldModel.find({ _id: { $in: favourites } });

        res.status(200).json({ favourites: favoriteSkifields });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Remove Skifield from Users Favourite list (Private)
router.delete("/favourites/:userId/:skifieldId", VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const { userId, skifieldId } = req.params;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.favourites.includes(skifieldId)) {
            return res.status(404).json({ error: "Skifield not found in user's favourite list" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { favourites: skifieldId } },
            { new: true }
        );

        res.json({ message: "Skifield removed from favourites", user: updatedUser });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post('/beenhere', VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const _id = req.body.userId;
    const skifieldId = req.body.skifieldId
    
    try {
        const user = await UserModel.findById(_id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.beenHere.includes(skifieldId)) {
            return res.status(400).json({ error: "Skifield already marked as been-here" }) 
        }
        
        user.beenHere.push(skifieldId);

        await user.save();

        res.status(200).json({ message: "Been Here saved successfully" });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred when saving been here" });
    }  
});


router.get("/beenhere/:userId", VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById( userId );
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        const beenhere = user.beenHere;
        const beenhereSkifields = await SkifieldModel.find({ _id: { $in: beenhere } });

        res.status(200).json({ beenhere: beenhereSkifields });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


// Remove Skifield from Users BeenHere list (Private)
router.delete("/beenhere/:userId/:skifieldId", VerifyTokenMiddleware, async (req: Request, res: Response) => {
    const { userId, skifieldId } = req.params;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.beenHere.includes(skifieldId)) {
            return res.status(404).json({ error: "Skifield not found in user's been here list" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { beenHere: skifieldId } },
            { new: true }
        );

        res.json({ message: "Skifield removed from been here list", user: updatedUser });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});



export default router;