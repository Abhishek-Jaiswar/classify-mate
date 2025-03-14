export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "You don't have permission to perform this action",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        message: "Error checking authorization",
        error: error.message,
      });
    }
  };
};
