import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { getAllOrders } from "../controllers/admin.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", createOrder);
router.get("/", getAllOrders);

export default router;
