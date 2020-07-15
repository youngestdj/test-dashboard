import jwt from 'jsonwebtoken';

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
  static verifyTempUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        errors: [
          'You need to register with your email to perform this operation.',
        ],
      });
    }
    jwt.verify(token, TEMP_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: ['You have been logged out, please login again to continue'],
        });
      }
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
  static verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        errors: ['Please log in.'],
      });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: ['You have been logged out, please login again to continue'],
        });
      }
      req.user = decoded;
      return next();
    });
  }
}

export default Auth;
