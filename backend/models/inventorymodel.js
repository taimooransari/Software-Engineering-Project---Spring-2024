import { Schema, model, mongoose } from 'mongoose';

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Ensure unique names
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    quantity: { type: Number, required: true },
    minQuantity: { type: Number, default: 5 } // Optional for stock thresholds 
});

const inventoryModel = mongoose.model('Inventory', inventorySchema);

export default inventoryModel;
