import { getAuth } from "@clerk/express";
import { UnauthorizedError } from "../lib/errors/AppError.js";
import { getUserByClerkId } from "../modules/users/users.services.js";

async function ensureAuthenticated(req, res, next) {
  const { isAuthenticated, userId: clerkId } = getAuth(req);

  if (!isAuthenticated || !clerkId) {
    return next(
      new UnauthorizedError("You must be logged in to access this resource."),
    );
  }

  const user = await getUserByClerkId(clerkId); // Error checks are done in the service function

  req.user = {
    id: user.id,
    username: user.username,
  };

  next();
}

export default ensureAuthenticated;
