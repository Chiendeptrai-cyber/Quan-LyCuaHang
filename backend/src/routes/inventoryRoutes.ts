import express, { Request, Response } from "express";
import Inventory from "../models/Inventory";
import InventoryItem from "../models/InventoryItem";
import Product from "../models/Product";

const router = express.Router();

// Get all inventories
router.get("/", async (req: Request, res: Response) => {
  try {
    const inventories = await Inventory.findAll({
      include: [{ model: InventoryItem, include: [Product] }],
    });
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching inventories", error: err });
  }
});

// Get inventory by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id, {
      include: [{ model: InventoryItem, include: [Product] }],
    });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Error fetching inventory", error: err });
  }
});

// Create inventory import
router.post("/", async (req: Request, res: Response) => {
  const { supplier, items } = req.body;
  try {
    const inventory = await Inventory.create({
      code: `INV-${Date.now()}`,
      supplier,
    });

    for (const item of items) {
      await InventoryItem.create({
        inventoryId: inventory.id,
        productId: item.productId,
        quantity: item.quantity,
      });

      // Update product stock
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({ stock: product.stock + item.quantity });
      }
    }

    const completeInventory = await Inventory.findByPk(inventory.id, {
      include: [{ model: InventoryItem, include: [Product] }],
    });

    res.status(201).json(completeInventory);
  } catch (err) {
    res.status(500).json({ message: "Error creating inventory", error: err });
  }
});

export default router;
