import express from 'express'
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.route.js';
import authRouter from './routes/auth.js';

dotenv.config();

// Σύνδεση με την βάση 
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const app = express();

// Για να μπορώ να στειλω json requests
app.use(express.json());

// Callback για να ακουσει την πορτα 3000
app.listen(3000, () => {
    console.log ('Server is running on port 3000');
});

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)