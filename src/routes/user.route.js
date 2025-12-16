import { Router } from "express";
import {
  addAddress,
  addWishlist,
  deleteAddress,
  deleteWishlist,
  getAddresses,
  getWishlist,
  updatedAddress,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protectRoute);

router.post("/addresss", addAddress);
router.get("/addresss", getAddresses);
router.put("/addresss/:id", updatedAddress);
router.delete("/addresss/:id", deleteAddress);

router.post("/wishlist", addWishlist);
router.get("/wishlist", getWishlist);
router.delete("/wishlist/:id", deleteWishlist);

export default router;
