<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 23f155d (feat : add method GET for front and backend)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./Router/AuthRouter.js";
import { protect } from "./middlewares/protect.js";
import RegisterRouter from "./Router/RegisterRouter.js";
import AooRouter from "./Router/AooRouter.js";
<<<<<<< HEAD
=======
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './Router/AuthRouter.js';
import { protect } from './middlewares/protect.js';
import RegisterRouter from './Router/RegisterRouter.js';
import ChawRouter from './Router/ChawRouter.js';
>>>>>>> 774a059 (feat:recruiter-page-1,2-backend)
=======
import ChawRouter from "./Router/ChawRouter.js";
>>>>>>> 23f155d (feat : add method GET for front and backend)

async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
<<<<<<< HEAD
<<<<<<< HEAD
  app.use("/users", RegisterRouter);
  app.use("/auth", authRouter);
  app.use("/aoo", AooRouter);
  app.get("/", (req, res) => {
=======
  app.use('/users', RegisterRouter);
  app.use('/auth', authRouter);
  app.use('/chaw',ChawRouter)
  app.get('/', (req, res) => {
>>>>>>> 774a059 (feat:recruiter-page-1,2-backend)
=======
  app.use("/users", RegisterRouter);
  app.use("/auth", authRouter);
  app.use("/chaw", ChawRouter);
  app.use("/aoo", AooRouter);
  app.get("/", (req, res) => {
>>>>>>> 23f155d (feat : add method GET for front and backend)
    return res.json({
      message: "Hello",
    });
  });

  app.listen(PORT, () => {
    console.log(`listen @ port ${PORT}`);
  });
}

init();
