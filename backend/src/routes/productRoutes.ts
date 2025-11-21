import express, { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import { Op } from "sequelize";

const router = express.Router();

// Get all products (visible only)
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ where: { hidden: false } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

// Search products
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { code, name, category } = req.query;
    const where: any = { hidden: false };
    if (code) where.code = { [Op.like]: `%${code}%` };
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (category) where.category = category;

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error searching products", error: err });
  }
});

// Get product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

// Create product
router.post("/", async (req: Request, res: Response) => {
  try {
    const { code, name, price, stock, category } = req.body;
    const product = await Product.create({
      code,
      name,
      price,
      stock,
      category,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err });
  }
});

// Update product
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
});

// Hide product
router.patch("/:id/hide", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({ hidden: true });
    res.json({ message: "Product hidden", product });
  } catch (err) {
    res.status(500).json({ message: "Error hiding product", error: err });
  }
});

// Show product
router.patch("/:id/show", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({ hidden: false });
    res.json({ message: "Product shown", product });
  } catch (err) {
    res.status(500).json({ message: "Error showing product", error: err });
  }
});

// Delete product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
});

export default router;
