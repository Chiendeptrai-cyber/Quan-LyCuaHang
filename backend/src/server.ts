import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import passport from "passport";
import session from "express-session";
import "./config/passport";

// Import models to setup relationships
import User from "./models/User";
import Product from "./models/Product";
import Customer from "./models/Customer";
import Order from "./models/Order";
import OrderItem from "./models/OrderItem";
import Inventory from "./models/Inventory";
import InventoryItem from "./models/InventoryItem";

// Import routes
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import customerRoutes from "./routes/customerRoutes";
import orderRoutes from "./routes/orderRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import reportRoutes from "./routes/reportRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup relationships
Order.belongsTo(Customer, { foreignKey: "customerId" });
Customer.hasMany(Order, { foreignKey: "customerId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

Inventory.hasMany(InventoryItem, { foreignKey: "inventoryId" });
InventoryItem.belongsTo(Inventory, { foreignKey: "inventoryId" });

Product.hasMany(InventoryItem, { foreignKey: "productId" });
InventoryItem.belongsTo(Product, { foreignKey: "productId" });

// Routes
app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Store Management API");
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
