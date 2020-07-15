import express from 'express';
import UserController from './controllers/user';
import TestController from './controllers/test';
import {
  validateSignup,
  returnValidationErrors,
} from './middlewares/validation';
import Auth from './middlewares/auth';
import verifyUserTest from './middlewares/verifyUserTest';

const router = express.Router();

router
  .route('/user/signup')
  .post(validateSignup, returnValidationErrors, UserController.registerUser);

router
  .route('/test')
  .post(Auth.verifyTempUser, verifyUserTest, TestController.testUser);

export default router;
