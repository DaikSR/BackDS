import express from "express";
import { productController } from "../controllers/product.controller.js";
const productRoute = express.Router();

productRoute.get("products/", productController.getAll);
productRoute.get("products/:id", productController.getById);

export default productRoute;
