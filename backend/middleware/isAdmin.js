const { User } = require("../models");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = isAdmin;