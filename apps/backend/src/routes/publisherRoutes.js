import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  getAllPublisher,
  getPublisher,
  createPublisher,
  deletePublisher,
  updatePublisher,
} from "../controllers/publisherController.js";
import { addToPublisherSchema } from "../validators/publisherValidator.js";

const router = express.Router();

// middleware
router.use(authMiddleware);

// routes
router.get("/", getAllPublisher);
router.get("/:id", getPublisher);
router.post("/", validateRequest(addToPublisherSchema), createPublisher);
router.delete("/:id", deletePublisher);
router.put("/:id", updatePublisher);

export default router;
