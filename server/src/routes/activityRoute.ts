import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { createActivity, getActivity, changeStatus, deleteActivity } from '../controller/activity.js';


const activityRouter = express.Router();
// auth 
activityRouter.route('/').post(isAuthenticatedUser, createActivity);
activityRouter.route('/:id').get(isAuthenticatedUser, getActivity).patch(isAuthenticatedUser, changeStatus).delete(isAuthenticatedUser, deleteActivity);




export default activityRouter;