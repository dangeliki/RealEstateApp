import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        summary: {
            type:String,
            required: true,
        },
        name: {
            type:String,
            required: true,
        },
        description: {
            type:String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        price: {
            type:Number,
            required: true,
        },
        phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/],
        },
        bathrooms: {
            type:Number,
            required: true,
        },
        bedrooms: {
            type:Number,
            required: true,
        },

        furnished: {
            type: Boolean,
            required: true,
        },
        parking : {
            type: Boolean,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },
        userRef: {
            type: String,
            required:true,
        },
    }, {timestamps:true}
)

const Listing = mongoose.model('Listing',listingSchema);
export default Listing;