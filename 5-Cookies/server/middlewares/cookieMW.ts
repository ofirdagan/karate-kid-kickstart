import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";

export const addCookie: RequestHandler = (req, res, next) => {
  if (!req.cookies.userID) {
    const token = uuidv4();
    req.cookies.userID = token;
    res.cookie("userID", token);
  }
  next();
};
