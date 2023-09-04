import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import registerRouter from "./Router/RegisterRouter.js";
import authRouter from "./Router/AuthRouter.js"

async function init() {
  const app = express();
  const PORT = process.env.PORT || 6000;

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/register", registerRouter);
  app.use("/auth", authRouter)

  app.get('/', (req, res) => {
    return res.json({
      message: 'Hello',
    });
  });

  app.listen(PORT, () => {
    console.log(`listen @ port ${PORT}`);
  });
}

init();
