import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { addToBookSchema } from "../validators/bookValidator.js";

const router = express.Router();

// middleware
router.use(authMiddleware);

// routes
router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", validateRequest(addToBookSchema), createBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

export default router;
