import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getCart,
  removieCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = Router();

router.use(protectRoute);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removieCartItem);
router.delete("/", clearCart);

export default router;
