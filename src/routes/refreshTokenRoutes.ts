import { Router } from "express";
import {
  handleLogin,
  handleRefresh,
  handleLogout,
} from "../controllers/refreshTokenController";

const router = Router();

router.post("/login", handleLogin);
router.post("/refresh", handleRefresh);
router.post("/logout", handleLogout);

export default router;
