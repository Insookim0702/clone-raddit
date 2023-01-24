import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("req.cookies", req.cookies);

    const token = req.cookies.token;
    if (!token) return next();

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findOneBy({ username });
    console.log("user", user);
    if (!user) throw new Error("unauthenticated");

    res.locals.user = user;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ auth: "유효한 유저가 아닙니다." });
  }
};
