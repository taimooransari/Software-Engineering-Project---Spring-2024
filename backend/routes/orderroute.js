import express from "express";
import orderModel from "../models/ordermodel.js";
import userModel from "../models/customermodel.js";
import inventoryModel from "../models/inventorymodel.js";
import fetchUser from "../middleware/fetchUser.js";
import nodemailer from "nodemailer";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51P8nRUGYLTJbmOKm5unfObEXOJPuHFo1rCQe2uH8RBwXmezMRW9ohMQzShyoAXtulG808LbQsJ4dY8gVnxcNQfmL00JL7731a8');

const app = express();
app.use(express.json());

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cluckngrill@gmail.com",
    pass: "jgibtwsiqjvmwewr",
  },
});

async function sendMail(order) {
  // Define email options
  let mailOptions = {
    from: "cluckngrill@gmail.com",
    to: order.email,
    subject: "Order Confirmation",
    text: `Thanks for your order! Your order status is ${order.orderStatus}`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

router.post("/create-checkout-session",async(req,res)=>{
  const {products} = req.body;


  const lineItems = products.map((product)=>({
      price_data:{
          currency:"inr",
          product_data:{
              name:product.name,
          },
          unit_amount:product.price * 100,
      },
      quantity:product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3001/success",
      cancel_url:"http://localhost:3001/cancel",
  });

  res.json({id:session.id})

})

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
      orderStatus: req.body.orderStatus,
    });

    // Find the customer
    if (req.body.customerId !== "") {
      const customer = await userModel.findById(req.body.customerId);
      // Add order to customer's history
      customer.pastOrders.push(newOrder._id);
      customer.loyaltyPoints += Math.floor(req.body.total / 10);
      await customer.save();
    }

    //Update inventory
    await Promise.all(
      req.body.items.map(async (item) => {
      const inventoryItem = await inventoryModel.findOne({ name: item.name });
      if (inventoryItem) {
        inventoryItem.quantity -= item.quantity;
        await inventoryItem.save();
      }
      })
    );

    // Send email
    await sendMail(newOrder);

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
  console.log(req.params.id);
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
});

router.put("/updateorder/:id", async (req, res) => {
  try {
    // 1. Retrieve the Order
    let order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    
    // 2. Dynamic Update Fields (Assumes we only update 'orderStatus')
    const updates = {};
    if (req.body.orderStatus) {
      // Additional validation for allowed status values might be necessary!
      updates.orderStatus = req.body.orderStatus;
    }

    // 3. Conditional Update
    if (Object.keys(updates).length === 0) {
      return res.status(400).send("No fields provided for update");
    }

    // 4. Update the Order
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

router.get("/getcustomerorders/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    console.log("This is the customer id", customerId);
    const orders = await orderModel.find({ customerId: customerId});
    res.json(orders);
    console.log("These are the orders", orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
