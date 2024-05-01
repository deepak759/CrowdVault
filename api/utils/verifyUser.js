import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(404,"you are not authorised,kindly login first"));
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(404,"invalid token"));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
