import express from 'express';
import UserController from './controllers/user';
import {
  validateSignup,
  returnValidationErrors,
} from './middlewares/validation';

const router = express.Router();

router
  .route('/user/signup')
  .post(validateSignup, returnValidationErrors, UserController.registerUser);

export default router;
