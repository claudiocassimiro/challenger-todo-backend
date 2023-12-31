import { Request, Response, NextFunction } from "express";
import "dotenv/config";

import { verify } from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = verify(token, process.env.JWT_SECRET) as TokenPayload;

    const { id } = data;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
