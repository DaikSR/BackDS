import jwt from "jsonwebtoken";
import { CartRepository } from "../repositories/cart.repository.js";
import models from "../models/index.js";
import { OrderRepository } from "../repositories/order.repository.js";

const cartRepository = new CartRepository(models.Carrito);
const orderRepository = new OrderRepository(models.Orden);

class OrderController {
  async create(req, res) {
    try {
      console.log("hereee");
      let token = req.headers.authorization;

      token = token.split(" ")[1];

      const user = jwt.verify(token, "jwt-secret");

      const cart = await cartRepository.findCartByUserId(user.id);

      if (cart.length === 0 || !cart) {
        res.status(400).json({ message: "No hay productos en el carrito" });
      } else {
        const product_ids = cart.map((item) => item.product_id);

        const dataForOrder = {
          user_id: user.id,
          product_ids,
          payment: false,
        };

        await orderRepository.create(dataForOrder);

        await Promise.all(
          cart.map(async (item) => {
            await cartRepository.deleleCart(item.id);
          })
        );

        await res.status(200).json({
          message: "Pedido creado correctamente",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al crear el pedido" });
    }
  }

  async getOrders(req, res) {
    try {
      let token = req.headers.authorization;

      token = token.split(" ")[1];

      const user = jwt.verify(token, "jwt-secret");

      let orders;

      if (user.role === "admin") {
        orders = await orderRepository.findAll();
      } else {
        orders = await orderRepository.findByUserId(user.id);
      }

      if (orders) {
        res.status(200).json(orders);
      } else {
        res.status(404).json({ message: "No se encontró el pedido" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener pedidos" });
    }
  }
}

export const orderController = new OrderController();
