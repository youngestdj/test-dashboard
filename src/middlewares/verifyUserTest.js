import { User } from '../models';

export default async (req, res, next) => {
  const { id } = req.user;
  try {
    const userTest = await User.findOne({ where: { id } });
    if (userTest.testSuccess !== null) {
      return res.status(401).json({
        errors: ['You have already taken this test'],
      });
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      errors: ['Something went wrong'],
    });
  }
};
