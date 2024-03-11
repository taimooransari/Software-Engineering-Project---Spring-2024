import express from 'express';
import inventoryModel from '../models/inventorymodel.js';

const app = express();
app.use(express.json());

const router = express.Router();

router.post("/addinventory", async (req, res) => {
    try {
        const newItem = await inventoryModel.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
);

router.get("/getinventory", async (req, res) => {
    try {
        const items = await inventoryModel.find({});
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get("/getinventory/:id", async (req, res) => {
    try {
        const item = await inventoryModel.findById(req.params.id);
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.put('/updateinventory/:id', /* Consider Authentication Middleware Here */ async (req, res) => {
    try {
        // 1. Find Item
        let item = await inventoryModel.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found"); 
        }

        // 2. Build Update Object (Only Include Fields Sent in the Request)
        const updateFields = {};
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.price) updateFields.price = req.body.price;
        if (req.body.quantity) updateFields.quantity = req.body.quantity;

        // 3. Update Document
        if (Object.keys(updateFields).length === 0) { // Check if there's anything to update
            return res.status(400).send("No fields provided for update");
        }

        item = await inventoryModel.findByIdAndUpdate(
            req.params.id, 
            { $set: updateFields },
            { new: true } // Return the updated document
        );

        res.json(item); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.delete("/deleteinventory/:id", async (req, res) => {
    try {
        const item = await inventoryModel.findByIdAndDelete(req.params.id);
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


export default router;