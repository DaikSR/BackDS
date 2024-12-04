import express from "express";
import { authController } from "../controllers/auth.controller.js";
const authRoute = express.Router();

authRoute.post("/auth/login", authController.login);

authRoute.post("/auth/register", authController.register);

authRoute.post("/auth/update", authController.update);

authRoute.get("/auth/me", authController.me);

export default authRoute;
