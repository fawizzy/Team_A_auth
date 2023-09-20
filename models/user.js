const Sequelize = require("sequelize");
const sequelize = new Sequelize("hngx", "gerard", "password", {
  host: "54.221.51.134",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  googleId: { type: Sequelize.STRING, unique: true },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  avatar: Sequelize.STRING,
  refreshToken: Sequelize.STRING,
  accessToken: Sequelize.STRING,
});

User.sync()
  .then(() => {
    console.log("User model synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing User model:", error);
  });

module.exports = {
  User,
};
