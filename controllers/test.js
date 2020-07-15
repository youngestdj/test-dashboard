import { User } from '../models';
import { generateToken } from '../utils/helpers';

/**
 * @class UserController
 * @override
 * @export
 */
export default class TestController {
  /**
   * @description Create a new user
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @memberof UserController
   * @returns {object} Class instance
   */
  static async testUser(req, res) {
    const {
      body: { answer },
      user: { id },
    } = req;

    try {
      if (answer === 'correct') {
        const token = generateToken();
        await User.update({ testSuccess: true }, { where: { id } });
        return res.status(201).json({
          message: 'All tests passed.',
          token,
        });
      }

      await User.update({ testSuccess: false }, { where: { id } });
      return res.status(201).json({
        message:
          'Thank you for taking the time to take the test. You did not meet our minimum requirements however.',
      });
    } catch (err) {
      return res.status(409).json({
        errors: [err],
      });
    }
  }
}
