import { describe, it, expect, vi } from "vitest";

vi.mock("../../lib/prisma.ts", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import prisma from "../../lib/prisma.ts";
import { createUser, updateUser, deleteUser } from "./users.services.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../lib/errors/AppError.js";

// Factory function to create a valid Clerk payload with optional overrides
const makeClerkPayload = (overrides = {}) => ({
  id: "user_clerk_123",
  first_name: "John",
  last_name: "Doe",
  username: "johndoe",
  email_addresses: [{ email_address: "johndoe@example.com" }],
  ...overrides,
});

describe("createUser", () => {
  // Test cases for UnprocessableEntityError when required fields are missing or invalid
  it.each([
    {
      description: "an empty email_addresses array",
      overrides: { email_addresses: [] },
    },
    {
      description: "a whitespace-only email address",
      overrides: { email_addresses: [{ email_address: "   " }] },
    },
    { description: "an empty first name", overrides: { first_name: "" } },
    { description: "an empty last name", overrides: { last_name: "" } },
    { description: "an empty username", overrides: { username: "" } },
    {
      description: "a whitespace-only username",
      overrides: { username: "   " },
    },
  ])(
    "throws UnprocessableEntityError when the user has $description",
    async ({ overrides }) => {
      // Arrange
      const payload = makeClerkPayload(overrides);

      // Act & Assert
      await expect(createUser(payload)).rejects.toThrow(
        UnprocessableEntityError,
      );

      // Validation must fail before any database call is made
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    },
  );

  it("throws ConflictError when a user with the same email already exists", async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ id: "existing_user_id" }); // Simulate existing user

    const payload = makeClerkPayload();

    await expect(createUser(payload)).rejects.toThrow(ConflictError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: payload.email_addresses[0].email_address },
    });
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("throws ConflictError when a user with the same username already exists", async () => {
    // Simulate no existing user with the same email
    prisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate existing user with the same username
    prisma.user.findUnique.mockResolvedValueOnce({ id: "existing_user_id" });

    const payload = makeClerkPayload();

    await expect(createUser(payload)).rejects.toThrow(ConflictError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: payload.email_addresses[0].email_address },
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: payload.username },
    });
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("creates a new user when the email and username are unique", async () => {
    // Simulate no existing user with the same email
    prisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate no existing user with the same username
    prisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate successful creation
    prisma.user.create.mockResolvedValueOnce({ id: "new_user_id" });

    const payload = makeClerkPayload();

    await expect(createUser(payload)).resolves.toEqual({ id: "new_user_id" });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: payload.email_addresses[0].email_address },
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: payload.username },
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: payload.email_addresses[0].email_address,
        fullName: `${payload.first_name} ${payload.last_name}`.trim(),
        username: payload.username,
        clerkId: payload.id,
      },
    });
  });
});
