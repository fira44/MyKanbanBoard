import express from "express";
import { createBoard, getBoard, updateBoard } from "../controllers/boardController.js";

const router = express.Router();

router.post("/boards", createBoard);
router.get("/boards/:id", getBoard);
router.put("/boards/:id", updateBoard);

export default router;
