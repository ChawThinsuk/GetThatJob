import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './Router/AuthRouter.js';
// import bigRouter from './Router/BigRouter.js';
import { protect } from './middlewares/protect.js';
import RegisterRouter from './Router/RegisterRouter.js';
import proRouter from './Router/ProRouter.js';
// import taRouter from './Router/TaRouter.js';
// import taRouter2 from './Router/TaRouter2.js';
// import AooRouter from './Router/AooRouter.js';

async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  app.use('/users', RegisterRouter);
  app.use('/auth', authRouter);
  app.use('/pro', proRouter);
  // app.use('/aoo', AooRouter);
  // app.use("/big", bigRouter);
  // app.use('/ta', taRouter);
  // app.use('/ta2', taRouter2);

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
