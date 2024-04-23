import { Schema, model, mongoose } from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: { type: String }, // Can be null for guest orders
    email: { type: String }, // Guest user email capture
    address: { type: String, required: true },
    phone: { type: String }, 
    orderItems: [{
        quantity: { type: Number, required: true },
        name: { type: String, required: true }, // Store name at the time of order
        price: { type: Number, required: true },
    }],
    orderStatus: { type: String, enum: ['Open','Fulfilled','Dispatched','Cancelled'], default: 'Open' },
    total: { type: Number, required: true },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;