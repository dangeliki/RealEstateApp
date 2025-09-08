import Listing from "../models/listing.js";
import { errorHandler } from "../utils/error.js";


// Δημιουργία εγγραφής

export const createListing = async (req,rest , next) => {
    try {
        const listing = await Listing.create(req.body);
        return rest.status(201).json(listing);
    } catch (error){
        next(error);
    }
};

// Διαγραφή εγγραφής

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

// Επεξεργασία εγγραφής

export const editListing = async ( req,res,next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,'Listing not found'));
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401,'You can only edit your own listing'));
    }

    try {
        const editedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(editedListing);
    } catch (error) {
        next(error);
    }


};


export const getListing = async(req , res, next) => {

    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        res.status(200).json(listing);

    } catch(error) {
        next(error);
    }

}

// Αναζήτηση εγγραφών
export const getListings = async (req,res,next) => {

    try {

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = {$in: [false,true]};
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = {$in: [false,true]};
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = {$in: ['sale','rent']};
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            summary: {$regex: searchTerm, $options: 'i'},
            furnished,
            parking,
            type,
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);

    }

    catch (error) {
        next(error);
    }

} 