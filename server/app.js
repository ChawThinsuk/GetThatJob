import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './Router/AuthRouter.js';
import { protect } from './middlewares/protect.js';
import RegisterRouter from './Router/RegisterRouter.js';
import RecruiterRouter from './Router/RecruiterRouter.js';
import RecruiterDisplayRouter from './Router/RecruiterDisplayRouter.js';
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
  app.use('/recruiter', RecruiterRouter);
  app.use('/recruiter-display', RecruiterDisplayRouter);
  app.use('/pro', proRouter);

  app.listen(PORT, () => {
    console.log(`listen @ port ${PORT}`);
  });
}

init();
