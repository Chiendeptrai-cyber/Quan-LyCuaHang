import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Inventory extends Model {
  public id!: number;
  public code!: string;
  public supplier!: string;
  public importTime!: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    importTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "inventories",
    timestamps: true,
  }
);

export default Inventory;
