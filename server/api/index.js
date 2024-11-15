import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

//routes
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js'; 
import wishlistRoutes from './routes/wishlistRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
//Resolve dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
// console.log(__dirname, __filename);

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true, 
}));
app.use(cookieParser());

app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

//Default gateway
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Api"
    })
});

//user routes
app.use('/api/v1/users', userRoutes);

//category routes
app.use('/api/v1/category', categoryRoutes);

//product routes
app.use('/api/v1/products', productRoutes);

//cart routes
app.use('/api/v1/cart', cartRoutes);

//order routes 
app.use('/api/v1/order', orderRoutes);

//shipping routes
app.use('/api/v1/ship-address/', shippingRoutes);

//wishlist routes
app.use('/api/v1/wishlist/',wishlistRoutes)

//warehouse routes
app.use('/api/v1/warehouse/',warehouseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
