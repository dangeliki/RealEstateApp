import Listing from "../models/listing.js";

export const createListing = async (req,rest , next) => {
    try {
        const listing = await Listing.create(req.body);
        return rest.status(201).json(listing);
    } catch (error){
        next(error);
    }
};