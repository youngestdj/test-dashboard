import bcrypt from 'bcrypt';
import { User } from '../models';
import { generateTempToken } from '../utils/helpers';

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
      const token = generateTempToken(user.id);
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

  /**
   * @description - Updates user's profile
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof ProfileController
   *
   * @returns {object} User Profile
   */
  static async editProfile(req, res) {
    try {
      const {
        body: { password, dob, address, gender },
      } = req;
      let imgUrl;

      if (req.file) imgUrl = req.file.path;
      await User.update(
        {
          dob,
          address,
          gender,
          birthCert: imgUrl,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        },
        { where: { id: req.user.id } }
      );
      return res.status(202).json({
        message: 'Profile updated successfully!',
        user: { dob, address, gender },
      });
    } catch (err) {
      return res.status(500).json({ errors: [err] });
    }
  }
}
