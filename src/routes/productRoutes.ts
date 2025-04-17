import { Router } from "express";
import {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
} from "../controllers/productController";
import { requireAuth } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", handleGetAllProducts);
router.get("/:id", handleGetProductById);

router.post("/", requireAuth, requireAdmin, handleCreateProduct);
router.put("/:id", requireAuth, requireAdmin, handleUpdateProduct);
router.delete("/:id", requireAuth, requireAdmin, handleDeleteProduct);

export default router;
