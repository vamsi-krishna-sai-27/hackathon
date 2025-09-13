const {prisma }= require('../utils/ConnectDB');

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { orders: true, cartItems: true }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
