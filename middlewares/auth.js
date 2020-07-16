import jwt from 'jsonwebtoken';
import { User } from '../models';

const { JWT_SECRET, TEMP_JWT_SECRET } = process.env;

/**
 * Authentication class
 */
class Auth {
  /**
   * @description Middleware function to verify if user has a valid token
   * @param {object} req http request object
   * @param {object} res http response object
   * @param {Function} next next middleware function
   * @returns {undefined}
   */
  static async verifyTempUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        errors: [
          'You need to register with your email to perform this operation.',
        ],
      });
    }
    jwt.verify(token, TEMP_JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: ['You have been logged out, please login again to continue'],
        });
      }
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user)
        return res.status(404).json({
          errors: ['User not found. Please create a new account.'],
        });
      req.user = decoded;
      return next();
    });
  }

  /**
   * @description Middleware function to verify if user has a valid token
   * @param {object} req http request object
   * @param {object} res http response object
   * @param {Function} next next middleware function
   * @returns {undefined}
   */
  static async verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        errors: ['Please log in.'],
      });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: ['You have been logged out, please login again to continue'],
        });
      }
      const user = await User.findOne({
        where: { id: decoded.id, testSuccess: true },
      });
      if (!user)
        return res.status(404).json({
          errors: [
            'User not found. Please create a new account or take the test if you have already created an account.',
          ],
        });
      req.user = decoded;
      return next();
    });
  }

  /**
   * @description Middleware function to verify if user has taken and passed test
   * @param {object} req http request object
   * @param {object} res http response object
   * @param {Function} next next middleware function
   * @returns {undefined}
   */
  static async checkValidUser(req, res, next) {
    try {
      const {
        body: { email },
      } = req;
      const user = await User.findOne({ where: { email, testSuccess: true } });
      if (!user) {
        return res
          .status(404)
          .json({ errors: ['User does not exist or has not taken the test'] });
      }
      return next();
    } catch (err) {
      return res.status(404).json({ errors: [err] });
    }
  }
}

export default Auth;
