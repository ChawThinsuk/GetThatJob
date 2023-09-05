import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import registerRouter from './Router/RegisterRouter.js';
import authRouter from './Router/AuthRouter.js';
import { protect } from './middlewares/protect.js';
async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  app.use('/register', registerRouter);
  app.use('/auth', authRouter);

  app.get('/', [protect], (req, res) => {
    return res.json({
      message: 'Hello',
    });
  });

  app.listen(PORT, () => {
    console.log(`listen @ port ${PORT}`);
  });
}

init();
