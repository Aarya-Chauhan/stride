// src/config/env.ts
import dotenv from "dotenv";

dotenv.config();

// ✅ Make this always a string for TypeScript
export const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
