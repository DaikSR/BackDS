import models from "../models/index.js";
import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
const cartRepository = new CartRepository(models.Carrito);
const productRepository = new ProductRepository(models.Producto);
import jwt from "jsonwebtoken";

class CartController {
  async getCart(req, res) {
    try {
      let token = req.headers.authorization;

      token = token.split(" ")[1];

      const user = jwt.verify(token, "jwt-secret");

      const cart = await cartRepository.findCartByUserId(user.id);

      if (cart) {
        const format = await Promise.all(
          cart.map(async (item) => {
            const product = await productRepository.findById(item.product_id);
            return {
              cart_id: item.id,
              quantity: item.quantity,
              product: product,
            };
          })
        );
        res.status(200).json(format);
      } else {
        res.status(404).json({ message: "No se encontró el carrito" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener carrito" });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const cart = await cartRepository.removeProductFromCart(req.params.id);

      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "No se encontró el carrito" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener carrito" });
    }
  }
}

export const cartController = new CartController();
