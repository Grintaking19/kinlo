import config from "../../config/config.js";
import type { Request, Response, NextFunction } from "express";
import { Webhook } from "svix";
import { createUser, updateUser, deleteUser } from "./users.services.js";

import {
  BadRequestError,
  InternalServerError,
} from "../../lib/errors/AppError.js";

// import { consoleTest } from "../../lib/consoleTest.js";
import type {
  CreateUserPayloadData,
  UpdateUserPayloadData,
  DeleteUserPayloadData,
} from "./users.types.js";

type ClerkWebhookEvent =
  | CreateUserPayloadData
  | UpdateUserPayloadData
  | DeleteUserPayloadData;

export const clerkWebhookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!config.CLERK_WEBHOOK_SECRET) {
    console.error(
      "CLERK_WEBHOOK_SECRET is not set in the environment variables.",
    );
    return next(new InternalServerError("Server configuration error."));
  }

  const svix_id = req.header("svix-id");
  const svix_timestamp = req.header("svix-timestamp");
  const svix_signature = req.header("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing required Svix headers for webhook verification.");
    return next(new BadRequestError("Missing required svix headers."));
  }

  const wh = new Webhook(config.CLERK_WEBHOOK_SECRET);
  let event: ClerkWebhookEvent;

  try {
    wh.verify(req.body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    event = JSON.parse(req.body.toString()) as ClerkWebhookEvent;
  } catch {
    // console.error("Webhook verification failed:");
    return next(new BadRequestError("Webhook verification failed"));
  }
  // console.log("Received Clerk webhook event:", event);
  try {
    switch (event.type) {
      case "user.created": {
        // consoleTest(`Creating user with ID ${data.username}`);
        const newUser = await createUser(event);
        return res.status(201).json({
          status: "success",
          message: `User with ID ${event.data.id} created successfully`,
          user: newUser,
        });
      }
      case "user.deleted": {
        // console.log(`Deleting user with ID ${data.id}`);
        const deletedUser = await deleteUser(event);
        return res.status(200).json({
          status: "success",
          message: `User with ID ${event.data.id} deleted successfully`,
          user: deletedUser,
        });
      }
      case "user.updated": {
        // console.log(`Updating user with ID ${data.id}`);
        const updatedUser = await updateUser(event);
        return res.status(200).json({
          status: "success",
          message: `User with ID ${event.data.id} updated successfully`,
          user: updatedUser,
        });
      }
    }
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const getMeController = async (req: Request, res: Response) => {
  const user = req.user; // This is set by the ensureAuthenticated middleware
  console.log("Authenticated user:", user);
  res.status(200).json({
    status: "success",
    user,
  });
};
