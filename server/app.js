import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./Router/AuthRouter.js";
import { protect } from "./middlewares/protect.js";
import RegisterRouter from "./Router/RegisterRouter.js";
import AooRouter from "./Router/AooRouter.js";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  app.use("/users", RegisterRouter);
  app.use("/auth", authRouter);
  app.use("/aoo", AooRouter);
  app.get("/", (req, res) => {
    return res.json({
      message: "Hello",
    });
  });

  app.listen(PORT, () => {
    console.log(`listen @ port ${PORT}`);
  });
}

init();
