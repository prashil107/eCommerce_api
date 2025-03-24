const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a product (Admin only)
router.post('/', authMiddleware, async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Admin access required" });

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

// Delete a product
router.delete('/:id', authMiddleware, async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Admin access required" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
});

module.exports = router;
