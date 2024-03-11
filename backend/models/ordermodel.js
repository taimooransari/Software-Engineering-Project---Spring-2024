import { Schema, model, mongoose } from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Can be null for guest orders
    email: { type: String }, // Guest user email capture
    address: { type: String, required: true },
    phone: { type: String }, 
    orderItems: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
        quantity: { type: Number, required: true },
        itemName: { type: String, required: true } // Store name at the time of order
    }],
    orderStatus: { type: String, enum: ['pending', 'confirmed', 'preparing', 'out for delivery', 'delivered', 'cancelled'], default: 'pending' },
    total: { type: Number, required: true },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;