import express from "express";
import { initializeModels } from "./models/index.js";
import authRoute from "./routes/auth.route.js";
import seedRoute from "./routes/seed.route.js";
import cors from "cors";
import productRoute from "./routes/products.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/api", authRoute);
app.use("/api", seedRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);

//
(async () => {
  try {
    await initializeModels();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
