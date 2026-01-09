import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// 1. Үндсэн хуудас руу ороход Монгол мессеж гарна
app.get('/', (req, res) => {
  res.json({ message: 'Сервер хэвийн ажиллаж байна! 🚀' });
});

// 2. Хэрэглэгч бүртгэх хэсэг
app.post('/users', async (req, res) => {
  try {
    // Нэрийг (name) энд нэмж авна
    const { email, name, password } = req.body;

    const user = await prisma.user.create({
      data: { 
        email, 
        name,      // Нэрийг бааз руу бичих
        password 
      }
    });

    // 2. ШИНЭ ХҮСЭЛТ ҮҮСГЭХ (Ticket Create)
app.post('/tickets', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const ticket = await prisma.ticket.create({
      data: {
        title,
        content,
        userId: Number(userId) // userId заавал тоо байна
      }
    });
    res.json(ticket);
  } catch (e) {
    res.status(400).json({ error: 'Хүсэлт илгээхэд алдаа гарлаа. User ID зөв эсэхийг шалгана уу.' });
  }
});
   
// 3. БҮХ ХҮСЭЛТИЙГ ХАРАХ (Ticket List)
app.get('/tickets', async (req, res) => {
  const tickets = await prisma.ticket.findMany({
    include: { user: true } // Хэн бичсэнийг харуулна
  });
  res.json(tickets);
});

// 4. ХҮСЭЛТЭД ХАРИУЛАХ (Ticket Reply)
app.put('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        reply: reply,
        status: 'CLOSED'
      }
    });
    res.json(updatedTicket);
  } catch (e) {
    res.status(400).json({ error: 'Хариулахад алдаа гарлаа' });
  }
});

    res.json(user);
  } catch (e) {
    // Алдааны мессежийг Монгол болгох
    res.status(400).json({ error: 'Хэрэглэгч үүсгэхэд алдаа гарлаа. Ижил email бүртгэлтэй байж магадгүй.' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр аслаа`);
});