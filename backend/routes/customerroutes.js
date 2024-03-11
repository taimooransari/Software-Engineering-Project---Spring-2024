import express from "express";
import userModel from "../models/customermodel.js";
import {body, validationResult} from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";

const JWT_SECRET = "mhmkisgood$";


const app = express();
app.use(express.json());

const router = express.Router();

router.post("/register", [
    body("Name").notEmpty().withMessage("Name is required"),
    body("Email").isEmail().withMessage("Email must be valid"),
    body("Password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try{
        let User = await userModel.findOne({Email: req.body.Email});
        if(User){
            return res.status(400).json({errors: [{msg: "User already exists"}]});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Password, salt);

        User = await userModel.create({
            name: req.body.Name,
            email: req.body.Email,
            password: hashedPassword
        });
        const payload = {
            User: {
                id: User.id
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, {expiresIn: 360000});
        console.log(authtoken);
        res.json({authtoken});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
}
);

router.post("/login", [
    body('Email','Enter a valid email').isEmail(),
    body('Password','Password cannot be blank').exists()
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {Email, Password} = req.body;
    try{
        let User = await userModel.findOne({Email});
        if(!User){
            return res.status(400).json({ success: false, errors: [{msg: "Invalid Credentials"}]});
        }
        const isMatch = await bcrypt.compare(Password, User.Password);
        if(!isMatch){
            return res.status(400).json({ success: false, errors: [{msg: "Invalid Credentials"}]});
        }
        const payload = {
            User: {
                id: User.id
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, {expiresIn: 360000});
        console.log(authtoken);
        res.json({success: true, authtoken});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
});

router.post("/getuser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const User = await userModel.findById(userId).select("-Password");
        res.send(User);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
