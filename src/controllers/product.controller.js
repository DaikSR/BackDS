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

  async update(req, res) {
    try {
      const token = req.headers.authorization;
      const tokenValue = token.split(" ")[1];

      const user = jwt.verify(tokenValue, "jwt-secret");

      const product = await productRepository.findById(req.params.id);

      if (product) {
        const newProduct = {
          ...product,
          titulo: req.body.titulo,
          image: req.body.image,
          precio: req.body.precio,
          description: req.body.description,
          content: req.body.content,
          detail: req.body.detail,
        };

        await productRepository.update(newProduct, req.params.id);

        res.status(200).json(newProduct);
      } else {
        res.status(404).json({ message: "No se encontró el producto" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  }

  async create(req, res) {
    try {
      const token = req.headers.authorization;
      const tokenValue = token.split(" ")[1];

      const user = jwt.verify(tokenValue, "jwt-secret");

      const newProduct = {
        titulo: req.body.titulo,
        image: req.body.image,
        precio: req.body.precio,
        description: req.body.description,
        content: req.body.content,
        detail: req.body.detail,
      };

      const product = await productRepository.create(newProduct);

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el producto" });
    }
  }
}

export const productController = new ProductController();
