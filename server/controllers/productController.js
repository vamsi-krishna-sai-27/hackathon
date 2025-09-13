const {prisma }= require('../utils/dbConnector');

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const products = await prisma.product.findMany({
      where: {
        AND: [
          category ? { category } : {},
          search ? { name: { contains: search, mode: 'insensitive' } } : {}
        ]
      }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl, category } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, stock, imageUrl, category }
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl, category } = req.body;
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, description, price, stock, imageUrl, category }
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
