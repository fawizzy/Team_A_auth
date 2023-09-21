  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      // If the user is authenticated, redirect them to another route (e.g., "/dashboard" or "/home")
      return res.redirect("/success"); 
    } else {
      return next();
    }
  };
  
  module.exports = { isLoggedIn };
  