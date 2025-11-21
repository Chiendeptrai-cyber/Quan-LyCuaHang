import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Inventory from "./Inventory";
import Product from "./Product";

class InventoryItem extends Model {
  public id!: number;
  public inventoryId!: number;
  public productId!: number;
  public quantity!: number;
}

InventoryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Inventory,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "inventory_items",
    timestamps: false,
  }
);

export default InventoryItem;
