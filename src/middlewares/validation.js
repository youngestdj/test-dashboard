import { check, validationResult } from 'express-validator';

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

export const validateEditProfile = [
  check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be more than 4 characters.'),
  check('address')
    .isLength({ min: 4 })
    .withMessage('Address must be more than 4 characters.')
    .isString()
    .withMessage('Address must be alphanumeric characters.'),
  check('gender')
    .isLength({ min: 4 })
    .withMessage('Gender must be at least 4 characters long.')
    .custom((value) => ['male', 'female', 'other'].indexOf(value) !== -1)
    .withMessage('Gender should either be male, female, or other'),
];

export const validateLogin = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the email.'),
  check('password')
    .isLength({ min: 4 })
    .withMessage('Please provide a valid password.'),
];
