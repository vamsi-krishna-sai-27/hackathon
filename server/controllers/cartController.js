const {prisma} =require('../utils/ConnectDB');

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: req.user.id,
        productId,
        quantity
      }
    });
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await prisma.cartItem.update({
      where: { id: req.params.itemId },
      data: { quantity }
    });
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    await prisma.cartItem.delete({ where: { id: req.params.itemId } });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({ where: { userId: req.user.id } });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
