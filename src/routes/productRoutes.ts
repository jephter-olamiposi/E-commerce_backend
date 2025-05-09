import { Router } from "express";
import {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
} from "../controllers/productController";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", handleGetAllProducts);
router.get("/:id", handleGetProductById);

router.post("/", requireAuth, requireAdmin, handleCreateProduct);
router.patch("/:id", requireAuth, requireAdmin, handleUpdateProduct);
router.delete("/:id", requireAuth, requireAdmin, handleDeleteProduct);

export default router;
