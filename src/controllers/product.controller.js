import models from "../models/index.js";
import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository(models.Usuario);
const productRepository = new ProductRepository(models.Producto);
const cartRepository = new CartRepository(models.Carrito);

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

  async addToCart(req, res) {
    try {
      const token = req.headers.authorization;
      const tokenValue = token.split(" ")[1];

      // jwt.verify(token, "jwt-secret", async (err, decoded) => {
      //   if (err) {
      //     res.status(401).json({ message: "Error en la autenticación" });
      //   } else {
      //     user = await userRepository.findById(decoded.id);
      //   }
      // });

      const user = await jwt.verify(tokenValue, "jwt-secret");
      console.log(user);

      const product = await productRepository.findById(req.params.id);

      if (product) {
        const cart = await cartRepository.findCartByUserId(user.id);

        if (cart) {
          const productInCart = cart.find((p) => p.product_id === product.id);

          if (productInCart) {
            await cartRepository.incrementQuantity(
              productInCart.quantity,
              productInCart.id
            );
            res.status(200).json({
              message: "Producto actualizado en el carrito",
            });
          } else {
            const newProductInCart = {
              user_id: user.id,
              product_id: product.id,
              quantity: 1,
            };
            await cartRepository.create(newProductInCart);
            res.status(200).json(newProductInCart);
          }
        } else {
          const newCart = {
            user_id: user.id,
            product_id: product.id,
            quantity: 1,
          };
          await cartRepository.create(newCart);
          res.status(200).json(newCart);
        }
      } else {
        res.status(404).json({ message: "No se encontró el producto" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al añadir al carrito" });
    }
  }
}

export const productController = new ProductController();
