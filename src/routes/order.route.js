import express from "express";
import { orderController } from "../controllers/order.controller.js";
import { authController } from "../controllers/auth.controller.js";
const orderRoute = express.Router();

orderRoute.get(
  "/orders/create-order",
  authController.verfyToken,
  orderController.create
);

orderRoute.get("/orders", authController.verfyToken, orderController.getOrders);

export default orderRoute;
