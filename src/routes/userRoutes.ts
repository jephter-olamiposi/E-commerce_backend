import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", requireAuth, (req, res) => {
  res.json({
    message: "You are viewing a protected route",
    user: req.user, // this comes from your JWT token
  });
});

export default router;
