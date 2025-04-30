import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import Product from "../models/Product";
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};
// add Product to cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// remove product in carrt/
export const removeFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};
