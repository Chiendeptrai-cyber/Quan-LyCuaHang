import express, { Request, Response } from "express";
import Product from "../models/Product";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Customer from "../models/Customer";
import { Op } from "sequelize";

const router = express.Router();

// Get current stock status
router.get("/stock", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ where: { hidden: false } });
    const stockReport = products.map((p) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
    }));
    res.json(stockReport);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error generating stock report", error: err });
  }
});

// Get stock status as of a specific date
router.get("/stock-by-date", async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date as string) : new Date();

    // Get all orders before the target date
    const orders: any = await Order.findAll({
      where: { purchaseTime: { [Op.lte]: targetDate }, status: "completed" },
      include: [{ model: OrderItem }],
    });

    // Calculate stock as of that date
    const products = await Product.findAll({ where: { hidden: false } });
    const stockReport = products.map((p: any) => {
      let deducedStock = 0;
      orders.forEach((order: any) => {
        order.OrderItems?.forEach((item: any) => {
          if (item.productId === p.id) {
            deducedStock += item.quantity;
          }
        });
      });
      return {
        id: p.id,
        code: p.code,
        name: p.name,
        category: p.category,
        price: p.price,
        currentStock: p.stock,
        stockAsOfDate: p.stock + deducedStock,
      };
    });
    res.json(stockReport);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error generating stock report", error: err });
  }
});

// Get customer purchase history
router.get(
  "/customer-purchases/:customerId",
  async (req: Request, res: Response) => {
    try {
      const { customerId } = req.params;
      const orders = await Order.findAll({
        where: { customerId, status: "completed" },
        include: [
          { model: Customer },
          { model: OrderItem, include: [Product] },
        ],
        order: [["purchaseTime", "DESC"]],
      });

      res.json(orders);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching customer purchases", error: err });
    }
  }
);

export default router;
