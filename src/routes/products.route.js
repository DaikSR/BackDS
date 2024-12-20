import express from "express";
import { productController } from "../controllers/product.controller.js";
import { authController } from "../controllers/auth.controller.js";
const productRoute = express.Router();

productRoute.get("/products/", productController.getAll);
productRoute.get("/products/:id", productController.getById);
productRoute.get(
  "/products/:id/cart",
  authController.verfyToken,
  productController.addToCart
);

productRoute.patch(
  "/products/:id",
  authController.verfyToken,
  productController.update
);
productRoute.post(
  "/products",
  authController.verfyToken,
  productController.create
);

export default productRoute;
