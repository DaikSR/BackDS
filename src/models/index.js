import axios from "axios";
import sequelize from "../config/database.config.js";
import Producto from "./product.model.js";
import Usuario from "./user.model.js";

// Añade más modelos si es necesario
const models = {
  Usuario,
  Producto,
};

const syncDatabase = false;

const initializeModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    if (syncDatabase === "true") {
      await sequelize.sync({ alter: true }); // Sincroniza modelos si está habilitado
      console.log("Modelos sincronizados con la base de datos.");
    }
  } catch (error) {
    console.error("Error al inicializar los modelos:", error);
  }
};
export { sequelize, initializeModels };
export default models;
