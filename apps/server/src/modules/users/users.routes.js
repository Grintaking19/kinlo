import express from "express";
import { clerkWebhookHandler } from "./users.controllers.js";

// import {createUser, updateUser, deleteUser } from "./users.service.js"

const router = express.Router();

/**
 * Routes Used by Clerk Webhooks to notify the server about user events like creation, deletion, and updates.
 */

router.post(
  "/",
  express.raw({ type: "application/json" }),
  clerkWebhookHandler,
);

export default router;
