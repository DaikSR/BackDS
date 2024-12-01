import express from "express";
import { seedController } from "../controllers/seed.controller.js";
const seedRoute = express.Router();

seedRoute.get("/seed", seedController.seed);

export default seedRoute;
