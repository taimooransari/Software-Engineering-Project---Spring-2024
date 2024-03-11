import express from 'express';
import orderModel from '../models/ordermodel.js';
import userModel from '../models/customermodel.js';
import inventoryModel from '../models/inventorymodel.js';
import fetchUser from '../middleware/fetchUser.js';

const app = express();
app.use(express.json());

const router = express.Router();

router.post("/addorder", async (req, res) => {
    try {
        console.log(req.body);
        // Create a new order document
        const newOrder = await orderModel.create({
            customerId: req.body.customerId, 
            address: req.body.address,
            orderItems: req.body.items,
            email: req.body.email,
            phone: req.body.phone,
            total: req.body.total,
            orderStatus: req.body.orderStatus
        });

        // Find the customer
        const customer = await userModel.findById(req.body.customerId);

        // Update inventory
        await Promise.all(req.body.items.map(async (item) => {
            const inventoryItem = await inventoryModel.findById(item.itemId);
            inventoryItem.quantity -= item.quantity;
            await inventoryItem.save();
        }));

        // Add order to customer's history
        customer.pastOrders.push(newOrder._id);
        customer.loyaltyPoints += Math.floor(req.body.total / 10);
        await customer.save();

        res.json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
         
    }
});

router.get("/getorders", async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get("/getorder/:id", async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        res.json(order);
    } catch (err) {

        console.error(err);
        res.status(500).send("Server error");
    }
});

router.delete("/deleteorder/:id", async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
);


router.put('/updateorder/:id', fetchUser, async (req, res) => {
    try {
        // 1. Retrieve the Order
        let order = await orderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).send("Order not found"); 
        }

        // 2. Check Authorization (Assuming only the customer who placed the order can update its status)
        if (order.customerId.toString() !== req.user.id) { 
            return res.status(403).send("Unauthorized to modify this order");
        }

        // 3. Dynamic Update Fields (Assumes we only update 'orderStatus')
        const updates = {};
        if (req.body.orderStatus) {
            // Additional validation for allowed status values might be necessary!
            updates.orderStatus = req.body.orderStatus; 
        }

        // 4. Conditional Update
        if (Object.keys(updates).length === 0) { 
            return res.status(400).send("No fields provided for update");
        }

        // 5. Update the Order
        order = await orderModel.findByIdAndUpdate(
            req.params.id, 
            { $set: updates },
            { new: true } 
        );

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;