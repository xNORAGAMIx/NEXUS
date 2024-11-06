import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//routes
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
