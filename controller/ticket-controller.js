import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Ticket үүсгэх (POST)
export const createTicket = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        userId: Number(userId), // ID-г тоо болгож хувиргах (хэрэв string ирвэл)
        status: "OPEN", // Default утга
      },
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. Бүх Ticket-ийг авах (GET)
export const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        User: true, // Хэн үүсгэснийг харах (User хүснэгттэй холбоно)
      },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Нэг Ticket-ийг ID-гаар нь авах (GET /:id)
export const getTicketById = async (req, res) => {
  const { id } = req.params; // URL дээрх /:id -г авна

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: Number(id), // URL-ээс ирсэн string ID-г тоо болгох
      },
      include: {
        Comment: true, // Тухайн ticket дээрх сэтгэгдлүүдийг хамт харах
      },
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket олдсонгүй" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
