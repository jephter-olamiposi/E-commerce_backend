import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  handleCreateAddress,
  handleGetAddresses,
  handleGetAddressById,
  handleUpdateAddress,
  handleDeleteAddress,
} from "../controllers/addressController";

const router = Router();

router.post("/", requireAuth, handleCreateAddress);
router.get("/", requireAuth, handleGetAddresses);
router.get("/:id", requireAuth, handleGetAddressById);
router.patch("/:id", requireAuth, handleUpdateAddress);
router.delete("/:id", requireAuth, handleDeleteAddress);

export default router;
