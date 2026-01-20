import express from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
} from "../controller/ticket-controller.js";

const router = express.Router();
router.route("/").post(createTicket).get(getTickets);

router.get("/:id", getTicketById);

export default router;
