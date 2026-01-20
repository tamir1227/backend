import express from "express";
import { createComment } from "../controller/comment-controller.js";

const router = express.Router();

// Чат бичих хаяг: POST /api/comment
router.post("/", createComment);

export default router;
