const express = require("express");

const Product = require("../Models/Product");
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//router Get  /api/orders/my-orderItems
// get logged-in users orders

router.get("/my-orders", protect, async (req, res) => {
  try {
    //find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//GET  /api/orders/:id - get order details by ID

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    //return the full order details

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
