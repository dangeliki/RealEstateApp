import express from 'express';
import { google, signin, signOut, signup } from '../controllers/auth.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { deleteUserByAdmin, getAllUsers, updateUserByAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post('/google',google);
router.get('/signout',signOut);
router.get("/users", verifyAdmin, getAllUsers);
router.put("/users/:id", verifyAdmin, updateUserByAdmin);
router.delete("/users/:id", verifyAdmin, deleteUserByAdmin);

export default router;