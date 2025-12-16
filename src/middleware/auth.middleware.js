import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = () => [
  requireAuth(),
  async (req, res, next) => {
    try {
      const id = req.auth().userId;
      if (!id) {
        return res
          .status(401)
          .json({ message: "unauthorized - invalid token" });
      }

      const user = User.findOne({ id });
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = user;
      next();
    } catch (error) {
      console.log("error protecting the route", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }

  if (req.user.email !== ENV.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden - admin access only" });
  }

  next();
};
