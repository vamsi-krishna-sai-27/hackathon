const {prisma }= require('../utils/dbConnector');

exports.createOrder = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });

    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: { orderItems: true }
    });

    await prisma.cartItem.deleteMany({ where: { userId: req.user.id } });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { orderItems: { include: { product: true } } }
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { orderItems: { include: { product: true } } }
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN')
      return res.status(403).json({ message: 'Not authorized' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: req.params.id } });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: 'CANCELLED' }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
