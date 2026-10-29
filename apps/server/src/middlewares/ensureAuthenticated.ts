import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { UnauthorizedError } from "../lib/errors/AppError.js";
import { getUserByClerkId } from "../modules/users/users.services.js";
import type { AuthUser } from "../modules/users/auth-user.js";

async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { isAuthenticated, userId: clerkId } = getAuth(req);
  // console.log("ensureAuthenticated middleware: isAuthenticated =", isAuthenticated, ", clerkId =", clerkId);

  if (!isAuthenticated || !clerkId) {
    return next(
      new UnauthorizedError("You must be logged in to access this resource."),
    );
  }

  const user = await getUserByClerkId(clerkId); // Error checks are done in the service function

  req.user = {
    id: user.id,
    username: user.username,
  } as AuthUser;

  next();
}

export default ensureAuthenticated;
