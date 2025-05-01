import { Router } from "express";
import { handleGetOrderItems } from "../controllers/orderItemController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/:id/items", requireAuth, handleGetOrderItems);

export default router;
