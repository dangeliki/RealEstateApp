import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token not valid"));

    // εδώ ελέγχουμε αν είναι admin
    if (user.role !== "admin") {
      return next(errorHandler(403, "You are not an admin"));
    }

    req.user = user; // βάζουμε τα στοιχεία του χρήστη στο req
    next();
  });
};
