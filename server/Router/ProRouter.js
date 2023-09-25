import { Router } from 'express';
import { protect } from '../middlewares/protect.js';
import { ProController } from './ProControllers/controllers.js';
const proRouter = Router();
const controllers = new ProController();
proRouter.use(protect);
//Phun
proRouter.route('/job/:id').get(controllers.getSingleJob);
proRouter.route('/followedJobs').get(controllers.getFollowedJob);
proRouter
  .route('/follow/job')
  .get(controllers.getJobFollowStatus)
  .put(controllers.updateJobFollowStatus)
  .post(controllers.createJobFollowStatus);
//Big
proRouter.route('/').get(controllers.getAllJobs);
proRouter.route('/job/popular').get(controllers.getPopularJob);
//Aoo
proRouter
  .route('/:id')
  .get(controllers.getProfProfile)
  .put(controllers.updatedProfileData);

//Ta

export default proRouter;
