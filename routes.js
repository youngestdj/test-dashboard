import express from 'express';
import UserController from './controllers/user';
import TestController from './controllers/test';
import {
  validateSignup,
  validateEditProfile,
  returnValidationErrors,
} from './middlewares/validation';
import Auth from './middlewares/auth';
import verifyUserTest from './middlewares/verifyUserTest';
import addImage from './middlewares/addImage';

const router = express.Router();

router
  .route('/user/signup')
  .post(validateSignup, returnValidationErrors, UserController.registerUser);

router
  .route('/test')
  .post(Auth.verifyTempUser, verifyUserTest, TestController.testUser);

router
  .route('/userprofile')
  .patch(
    Auth.verifyUser,
    addImage,
    validateEditProfile,
    returnValidationErrors,
    UserController.editProfile
  );

export default router;
