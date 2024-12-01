import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Producto = sequelize.define("producto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Producto;
