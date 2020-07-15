module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: DataTypes.STRING,
    address: DataTypes.STRING,
    birthCert: DataTypes.STRING,
    gender: DataTypes.STRING,
    testSuccess: DataTypes.BOOLEAN,
  };
  const User = sequelize.define('User', userSchema, {});
  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
