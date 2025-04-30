import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/:userId", authenticate, getCart);
router.post("/add", authenticate, addToCart);
router.post("/remove", authenticate, removeFromCart);

export default router;
