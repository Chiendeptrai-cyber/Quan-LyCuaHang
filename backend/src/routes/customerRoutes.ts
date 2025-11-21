import express, { Request, Response } from "express";
import Customer from "../models/Customer";
import { Op } from "sequelize";

const router = express.Router();

// Get all customers
router.get("/", async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers", error: err });
  }
});

// Search customers
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { code, name } = req.query;
    const where: any = {};
    if (code) where.code = { [Op.like]: `%${code}%` };
    if (name) where.name = { [Op.like]: `%${name}%` };

    const customers = await Customer.findAll({ where });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error searching customers", error: err });
  }
});

// Get customer by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customer", error: err });
  }
});

// Create customer
router.post("/", async (req: Request, res: Response) => {
  try {
    const { code, name, birthYear, address } = req.body;
    const customer = await Customer.create({ code, name, birthYear, address });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error creating customer", error: err });
  }
});

// Update customer
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.update(req.body);
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error updating customer", error: err });
  }
});

// Delete customer
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.destroy();
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer", error: err });
  }
});

export default router;
