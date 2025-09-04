import Listing from "../models/listing.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req,rest , next) => {
    try {
        const listing = await Listing.create(req.body);
        return rest.status(201).json(listing);
    } catch (error){
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,'Listing not found'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401,'You can only delete your listings'));
    }

    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing deleted')
    } catch(error) {
        next(error);
    }

};