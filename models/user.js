const Sequelize = require('sequelize');
const sequelize = new Sequelize("hngx", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define('User', {
  googleId: { type: Sequelize.STRING, unique: true },
  twitterId: { type: Sequelize.STRING, unique: true }, // Add this line
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  avatar: Sequelize.STRING,
  refreshToken: Sequelize.STRING,
  accessToken: Sequelize.STRING,
});

User.sync()
  .then(() => {
    console.log('User model synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing User model:', error);
  });

module.exports = {
  User,
};
