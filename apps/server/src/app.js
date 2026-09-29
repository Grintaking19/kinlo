import express from "express";
import cors from "cors";
import userRoutes from "./modules/users/users.routes.js";
import { clerkMiddleware } from "@clerk/express";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(cors());
app.use("/api/webhooks",  userRoutes);
app.use(express.json());

// app.use(clerkMiddleware);


// Error handling middleware (Last middleware to be used)
app.use(errorHandler);

export default app;
