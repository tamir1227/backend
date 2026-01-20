import prisma from "../utils/prsma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Хэрэглэгчдийг авахад алдаа гарлаа." });
  }
};

export const createUser = async (req, res) => {
  const { name, password } = req.body; // Frontend-ээс ирэх мэдээлэл

  if (!name || !password) {
    return res.status(400).json({ message: "Нэр болон нууц үг шаардлагатай!" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        password: password,
      },
    });
    res.status(201).json(user); // Амжилттай үүссэн хэрэглэгчийг буцаана
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
