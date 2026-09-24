import type { Request, Response, NextFunction } from "express";
import type { AuthUser } from "../modules/users/auth-user.ts";
import { getAuth } from "@clerk/express";
import prisma from "../lib/prisma.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId: clerkId } = getAuth(req);
  if (!clerkId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = {
    id: user.id,
    username: user.username,
  } satisfies AuthUser;

  next();
}
