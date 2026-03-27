import express from "express";
import {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthor,
  getAuthor,
} from "../controllers/authorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToAuthorSchema } from "../validators/authorValidator.js";

const router = express.Router();

// middleware
router.use(authMiddleware);

// routes
router.get("/", getAllAuthor);
router.get("/:id", getAuthor);
router.post("/", validateRequest(addToAuthorSchema), createAuthor);
router.delete("/:id", deleteAuthor);
router.put("/:id", updateAuthor);

export default router;
