module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: {
            args: true,
            msg: 'Email already exists.',
          },
        },
        dob: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        birthCert: {
          type: Sequelize.STRING,
        },
        gender: {
          type: Sequelize.STRING,
        },
        testSuccess: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint('Users', ['email'], {
          type: 'unique',
          name: 'Email already exists.',
        })
      );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  },
};
