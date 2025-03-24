const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    totalPrice: Number,
    status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
