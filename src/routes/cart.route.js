import express from "express";
import { cartController } from "../controllers/cart.controller.js";
import { authController } from "../controllers/auth.controller.js";
const cartRoute = express.Router();

cartRoute.get("/cart", authController.verfyToken, cartController.getCart);
cartRoute.delete(
  "/cart/:id",
  authController.verfyToken,
  cartController.removeProductFromCart
);

export default cartRoute;
