import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get the cart for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The user's cart
 *       404:
 *         description: Cart not found
 */
router.get("/:userId", authenticate, getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to the cart
 */
router.post("/add", authenticate, addToCart);
router.post("/remove", authenticate, removeFromCart);

export default router;
