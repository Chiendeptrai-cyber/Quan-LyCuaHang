import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Customer from "./Customer";

class Order extends Model {
  public id!: number;
  public customerId!: number;
  public totalAmount!: number;
  public status!: string;
  public purchaseTime!: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    purchaseTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
