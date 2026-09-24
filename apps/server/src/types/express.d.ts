import { AuthUser } from "../modules/users/auth-user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
