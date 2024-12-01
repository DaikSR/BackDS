import express from "express";
import { initializeModels } from "./models/index.js";
import authRoute from "./routes/auth.route.js";
import seedRoute from "./routes/seed.route.js";
import cors from "cors";

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/api", authRoute);
app.use("/api", seedRoute);

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
