// just for admin
import express from "express";
import {
  getAllUsers,
  deleteUser,
  createAccountAdmin,
} from "../controllers/userController";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

/**
 * @swagger
 * /api/admin/getalluser:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 *       401:
 *         description: Unauthorized
 */
router.get("/getalluser", isAdmin, getAllUsers);

/**
 * @swagger
 * /api/admin/deletUser/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/deletUser/:id", isAdmin, deleteUser);

/**
 * @swagger
 * /api/admin/creatUser:
 *   post:
 *     summary: Create a new admin account (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin account created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/creatUser", isAdmin, createAccountAdmin);

export default router;
