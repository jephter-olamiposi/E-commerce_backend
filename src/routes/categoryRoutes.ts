import { Router } from "express";
import {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
} from "../controllers/categoryController";

import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", handleGetAllCategories);
router.get("/:id", handleGetCategoryById);

router.post("/", requireAuth, requireAdmin, handleCreateCategory);
router.patch("/:id", requireAuth, requireAdmin, handleUpdateCategory);
router.delete("/:id", requireAuth, requireAdmin, handleDeleteCategory);

export default router;
