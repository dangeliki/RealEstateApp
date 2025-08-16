import express from 'express'
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.route.js';

dotenv.config();

// Σύνδεση με την βάση 
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const app = express();

// Callback για να ακουσει την πορτα 3000
app.listen(3000, () => {
    console.log ('Server is running on port 3000');
});

app.use("/api/user",userRouter)