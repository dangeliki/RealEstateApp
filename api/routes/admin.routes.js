import express from "express";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import { getAllUsers,deleteUserByAdmin, updateUserByAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

// Όλες οι admin λειτουργίες
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUserByAdmin);
router.put("/users/:id", verifyAdmin, updateUserByAdmin);

export default router;
