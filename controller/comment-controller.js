// Таны файл utils/prsma.js нэртэй байгаа тул ингэж бичнэ:
import prisma from "../utils/prsma.js";

export const createComment = async (req, res) => {
  const { text, ticketId, userId } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        text,
        ticketId: Number(ticketId),
        userId: Number(userId),
      },
      include: { User: true },
    });
    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Чат бичихэд алдаа гарлаа" });
  }
};
