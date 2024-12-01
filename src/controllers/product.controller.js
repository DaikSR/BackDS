import models from "../models/index.js";
import { ProductRepository } from "../repositories/product.repository.js";

class ProductController {
  async getAll(req, res) {
    try {
      const productRepository = new ProductRepository(models.Producto);
      const products = await productRepository.findAll();

      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: "No se encontraron productos" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener productos" });
    }
  }

  async getById(req, res) {
    try {
      const productRepository = new ProductRepository(models.Producto);
      const product = await productRepository.findById(req.params.id);

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "No se encontró el producto" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener producto" });
    }
  }
}

export const productController = new ProductController();
