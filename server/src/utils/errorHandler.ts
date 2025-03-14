import { Response } from "express";

export const handleError = (res: Response, error: any) => {
  console.error("Error:", error);

  if (error.name === "PrismaClientKnownRequestError") {
    // Handle Prisma-specific errors
    switch (error.code) {
      case "P2002":
        return res.status(400).json({
          message:
            "A unique constraint would be violated on one or more fields.",
          field: error.meta?.target?.[0],
        });
      case "P2025":
        return res.status(404).json({
          message: "Record not found.",
        });
      default:
        return res.status(400).json({
          message: "Database operation failed.",
          error: error.message,
        });
    }
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed.",
      errors: error.errors,
    });
  }

  // Default error response
  return res.status(500).json({
    message: "Internal server error.",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
