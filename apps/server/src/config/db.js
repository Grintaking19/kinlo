import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "./config.js";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log:
    config.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

export default prisma;
