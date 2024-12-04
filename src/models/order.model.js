import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Orden = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  payment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Orden;
