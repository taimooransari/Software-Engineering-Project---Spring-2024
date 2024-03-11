import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import customerroutes from './routes/customerroutes.js';
import orderroutes from './routes/orderroute.js';
import inventoryroute from './routes/inventoryroute.js';
// Load environment variables

dotenv.config(); 

const app = express();

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // For parsing JSON request bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { // Replace with your connection string
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Routes (More on this later)
// ... 

app.use('/api/customers', customerroutes);
app.use('/api/orders', orderroutes);
app.use('/api/inventory', inventoryroute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
