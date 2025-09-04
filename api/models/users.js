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
        default: "https://images.icon-icons.com/1993/PNG/512/avatar_male_man_people_person_profile_user_icon_123199.png"
    },
}, {timestamps:true});

// Create Schema 
const User = mongoose.model('User',userSchema);
export default User;