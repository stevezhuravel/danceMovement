  module.exports = (sequelize, Sequelize) => {
      const User = sequelize.define("users", {
          username: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
              primaryKey: true
          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false,
          }
      });

      return User;
  };