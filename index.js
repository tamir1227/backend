import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import commentRouter from "./router/comment-route.js";
import ticketRouter from "./router/ticket-route.js";
import userRouter from "./router/user-route.js";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/comment", commentRouter);

// Сервер асаах
app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр аслаа`);
});
