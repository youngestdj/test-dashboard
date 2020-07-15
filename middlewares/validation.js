import { check, validationResult } from 'express-validator';
import { User } from '../models';

export const returnValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);
  if (!errors.length) return next();
  return res.status(422).json({ errors });
};

export const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the email.'),
  check('firstname')
    .isLength({ min: 2 })
    .withMessage('Firstname must be at least 2 characters long.')
    .isString()
    .withMessage('Firstname must be alphanumeric characters.'),
  check('lastname')
    .isLength({ min: 2 })
    .withMessage('Lastname must be at least 2 characters long.')
    .isString()
    .withMessage('Lastname must be alphanumeric characters.'),
];

export const validateUser = async (req, res, next) => {
  const {
    body: { userId },
  } = req;
  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        errors: ['User does not exist.'],
      });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      errors: ['Something went wrong'],
    });
  }
};
