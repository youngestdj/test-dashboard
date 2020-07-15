import { User } from '../models';
import { generateToken } from '../utils/helpers';
/**
 * @class UserController
 * @override
 * @export
 */
export default class UserController {
  /**
   * @description Create a new user
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof UserController
   * @returns {object} Class instance
   */
  static async registerUser(req, res) {
    const {
      body: { email, firstname, lastname },
    } = req;

    try {
      const user = await User.create({ email, firstname, lastname });
      const token = generateToken(user.id);
      const { id } = user;
      return res.status(201).json({
        message: 'You have signed up successfully.',
        user: { id, firstname, lastname, email },
        token,
      });
    } catch (err) {
      const errors = [];
      if (err.errors && err.errors[0].path === 'email') {
        errors.push(err.errors[0].message);
      }
      return res.status(409).json({
        errors,
      });
    }
  }
}
