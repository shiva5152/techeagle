import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { signUpUser, loginUser, logoutUser, currentUser, getUserActivities } from '../controller/user.js';

const userRouter = express.Router();


// auth 
userRouter.route('/auth/signup').post(signUpUser);
userRouter.route('/auth/login').post(loginUser);
userRouter.route('/auth/logout').get(logoutUser);
userRouter.route('/me').get(isAuthenticatedUser, currentUser);
userRouter.route('/activity/:id').get(isAuthenticatedUser, getUserActivities);





export default userRouter;