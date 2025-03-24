const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Order
router.post('/create', authMiddleware, async (req, res) => {
    const { items, totalPrice } = req.body;
    const order = new Order({ userId: req.user.id, items, totalPrice });

    await order.save();
    res.status(201).json(order);
});

// Fetch Orders (Admin only)
router.get('/', authMiddleware, async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Admin access required" });

    const orders = await Order.find();
    res.json(orders);
});

module.exports = router;
