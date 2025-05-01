import { Router } from "express";
import {
  registerUser,
  loginUser,
  createAdminUser,
} from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/admin/create", requireAuth, requireAdmin, createAdminUser);

export default router;
