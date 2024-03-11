import { Schema, model, mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String }, // Even guest orders might have a name
    email: { type: String, unique: true }, 
    password: { type: String }, 
    pastOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    loyaltyPoints: { type: Number, default: 0 }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
