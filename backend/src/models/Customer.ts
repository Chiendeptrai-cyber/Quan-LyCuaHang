import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Customer extends Model {
  public id!: number;
  public code!: string;
  public name!: string;
  public birthYear!: number;
  public address!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Customer.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: true,
  }
);

export default Customer;
