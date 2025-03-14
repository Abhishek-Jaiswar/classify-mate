import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
      (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error authenticating token", error: error.message });
  }
};
