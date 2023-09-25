import { Router } from 'express';
import { protect } from '../middlewares/protect.js';
import { ProController } from './ProControllers/controllers.js';
const proRouter = Router();
const controllers = new ProController();
proRouter.use(protect);
//Phun
proRouter.route('/job/popular').get(controllers.getPopularJob);
proRouter.route('/job/:id').get(controllers.getSingleJob);
proRouter.route('/followedJobs').get(controllers.getFollowedJob);
proRouter
  .route('/follow/job')
  .get(controllers.getJobFollowStatus)
  .put(controllers.updateJobFollowStatus)
  .post(controllers.createJobFollowStatus);
//Big
proRouter.route('/').get(controllers.getAllJobs);
//Aoo
proRouter
  .route('/:id')
  .get(controllers.getProfProfile)
  .put(controllers.updatedProfileData);
//Ta
proRouter.get('/users/applist/:user_id', controllers.getApplyJob);
proRouter.put(
  '/users/applist/:user_id/jobs/:job_id',
  controllers.handleDecline
);
proRouter.get('/users/:id', controllers.getExpData);
proRouter.put('/users/:user_id/jobs/:job_id', controllers.submitProfileData);

export default proRouter;
