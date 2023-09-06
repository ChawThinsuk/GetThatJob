import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jobRouter from './Router/JobRouter.js';
import professionalRouter from './Router/ProfessionalRouter.js';
import recruiterRouter from './Router/RecruiterRouter.js';
import authRouter from './Router/AuthRouter.js';
import { protect } from './middlewares/protect.js';

async function init() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  app.use('/job', jobRouter);
  app.use('/professional', professionalRouter);
  app.use('/recruiter', recruiterRouter);
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
