import models from "../models/index.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

const productRepository = new ProductRepository(models.Producto);

const userRepository = new UserRepository(models.Usuario);

import bcrypt from "bcrypt";

class SeedController {
  async seed(req, res) {
    try {
      const products = [
        {
          titulo: "Televisor",
          image:
            "https://oechsle.vteximg.com.br/arquivos/ids/18269076-998-998/2667355.jpg?v=638550789852100000",
          precio: 1000,
          description: "",
          content: "",
          detail: "",
        },
        {
          titulo: "Licuadora",
          image:
            "https://osterpe.vtexassets.com/arquivos/ids/159312/BLSTKAG-WRD-2.jpg?v=638357282696170000",
          precio: 600,
        },
        {
          titulo: "Horno",
          image:
            "https://promart.vteximg.com.br/arquivos/ids/8029904-1000-1000/114662.jpg?v=638550359526900000",
          precio: 4000,
        },
      ];
      products.forEach(async (product) => {
        await productRepository.create(product);
      });

      await userRepository.create({
        nombre_completo: "Admin",
        correo: "admin@admin.com",
        contrasena: bcrypt.hashSync("admin", 10),
        role: "admin",
      });

      res.status(200).json({ message: "Base de datos inicializada" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al inicializar la base de datos" });
    }
  }
}

export const seedController = new SeedController();
