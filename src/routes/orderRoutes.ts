import { Router } from "express";
import {
  handleCreateOrder,
  handleGetOrderById,
  handleGetUserOrders,
} from "../controllers/orderController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/", requireAuth, handleCreateOrder);
router.get("/", requireAuth, handleGetUserOrders);
router.get("/:id", requireAuth, handleGetOrderById);

export default router;
