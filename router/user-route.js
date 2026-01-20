import express from "express";
// 1. Энд createUser-ийг нэмж import хийх ёстой 👇
import { createUser, getUsers } from "../controller/user-controller.js";

const router = express.Router();

// 2. Ингэж бичвэл илүү цэгцтэй (GET болон POST нэг дор)
router
  .route("/")
  .get(getUsers) // Мэдээлэл авах
  .post(createUser); // Мэдээлэл илгээх (Бүртгэх)

export default router;
