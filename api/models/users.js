import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://images.icon-icons.com/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, {timestamps:true});

// Create Schema 
const User = mongoose.model('User',userSchema);
export default User;