// this is a  middleware function that authenticates the user's access token and refresh token and grants access to the protected routes if the tokens are valid. However, it does not include any code to keep the user logged in.

//To keep the user logged in, you need to generate and store a new access token and refresh token each time the user logs in or refreshes their access token. You can store the refresh token in an HTTP-only cookie to prevent it from being accessed by JavaScript code, and use it to generate a new access token when the old one expires.

// Here's an updated version of the authenticateUser middleware that includes code to keep the user logged in



const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

/**
 * Middleware function that authenticates the user's access token and refresh token
 * and grants access to the protected routes if the tokens are valid.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateUser = (req, res, next) => {
  // Extract the access token from the Authorization header
  const accessToken = req.headers.authorization.split(" ")[1];
  // Extract the refresh token from the cookie
  const refreshToken = req.cookies.refreshToken;

  // Find the user in the database using the access token and refresh token
  User.findOne({ where: { accessToken, refreshToken } })
    .then((user) => {
      if (!user) {
        // If the user is not found, return a 401 Unauthorized response
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check if the access token has expired
      const decodedAccessToken = jwt.decode(accessToken);
      if (decodedAccessToken.exp < Date.now() / 1000) {
        // If the access token has expired, generate a new access token using the refresh token
        const newAccessToken = jwt.sign({ sub: user.id }, "SECRET", {
          expiresIn: "1h",
        });
        // Update the user's access token in the database
        user.update({ accessToken: newAccessToken });
        // Set the new access token in the response header
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      }

      // Set the user object on the request and call the next middleware
      req.user = user;
      next();
    })
    .catch((error) => {
      // If there's an error, return a 401 Unauthorized response
      return res.status(401).json({ message: "Unauthorized" });
    });
};

module.exports = { authenticateUser };
