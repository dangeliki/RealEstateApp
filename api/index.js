import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.route.js';
import listingRouter from './routes/listing.js'
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: "../.env" });

// Σύνδεση με την βάση 
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const app = express();

// Για να μπορώ να στειλω json requests
app.use(express.json());

app.use(cookieParser());

// Callback για να ακουσει την πορτα 3000
app.listen(3000, () => {
    console.log ('Server is running on port 3000');
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});