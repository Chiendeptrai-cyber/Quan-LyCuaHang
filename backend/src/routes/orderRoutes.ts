import express, { Request, Response } from "express";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Product from "../models/Product";
import Customer from "../models/Customer";
import { Op } from "sequelize";

const router = express.Router();

// Get all orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Customer }, { model: OrderItem, include: [Product] }],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
});

// Search orders
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { customerId, status, startDate, endDate } = req.query;
    const where: any = {};
    if (customerId) where.customerId = customerId;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.purchaseTime = {};
      if (startDate) where.purchaseTime[Op.gte] = new Date(startDate as string);
      if (endDate) where.purchaseTime[Op.lte] = new Date(endDate as string);
    }

    const orders = await Order.findAll({
      where,
      include: [{ model: Customer }, { model: OrderItem, include: [Product] }],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error searching orders", error: err });
  }
});

// Get order by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Customer }, { model: OrderItem, include: [Product] }],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err });
  }
});

// Create order
router.post("/", async (req: Request, res: Response) => {
  const { customerId, items } = req.body;
  try {
    // Check stock availability
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product ${product?.name}` });
      }
    }

    const order = await Order.create({ customerId, totalAmount: 0 });
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        const price = product.price;
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: price,
        });
        totalAmount += price * item.quantity;
        // Update stock
        await product.update({ stock: product.stock - item.quantity });
      }
    }

    await order.update({ totalAmount, status: "completed" });

    const completeOrder = await Order.findByPk(order.id, {
      include: [{ model: Customer }, { model: OrderItem, include: [Product] }],
    });

    res.status(201).json(completeOrder);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err });
  }
});

export default router;
