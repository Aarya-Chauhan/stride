// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// Extend Request so we can safely attach userId
export interface AuthRequest extends Request {
  userId?: string;
}

interface AuthPayload extends JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // 1) Check header exists and is in "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");
  const token = parts[1];

  // 2) Extra safety: token might still be missing
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // 3) Verify token
    // jsonwebtoken types: verify(...) returns string | JwtPayload
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

    // 4) Narrow the type so TS is happy
    if (typeof decoded === "string" || !("userId" in decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const payload = decoded as AuthPayload;

    // 5) Attach userId to the request for later handlers/controllers
    req.userId = payload.userId;

    // 6) Continue to next middleware / route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
