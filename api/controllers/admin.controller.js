// api/controllers/admin.controller.js
import User from "../models/users.js"; // σιγουρέψου ότι το path είναι σωστό
import { errorHandler } from "../utils/error.js";

// 🟢 Ενημέρωση χρήστη από Admin
export const updateUserByAdmin = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          role: req.body.role,
        },
      },
      { new: true }
    );
    if (!updatedUser) return next(errorHandler(404, "User not found"));
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// 🟢 Διαγραφή χρήστη από Admin
export const deleteUserByAdmin = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(errorHandler(404, "User not found"));
    res.status(200).json({ message: "User has been deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// 🟢 Επιστροφή όλων των χρηστών
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // κρύβουμε το password
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
