import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

let errorSpy;

beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
  errorSpy = undefined;
});

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
import {
  createUser,
  updateUser,
  deleteUser,
  getUserByClerkId,
  getUserByEmail,
  getUserByUsername,
} from "./users.services.js";
import {
  InternalServerError,
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

const makeDBUser = (overrides = {}) => ({
  clerkId: "user_clerk_123",
  fullName: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  ...overrides,
});

/**
 * Tests for the createUser function
 */

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
        email: "johndoe@example.com",
        fullName: "John Doe",
        username: "johndoe",
        clerkId: "user_clerk_123",
      },
    });
  });

  it("throws InternalServerError when there is an error during user creation", async () => {
    // Simulate no existing user with the same email
    prisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate no existing user with the same username
    prisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate an error during user creation
    prisma.user.create.mockRejectedValueOnce(
      new Error("Database error during user creation"),
    );
    const payload = makeClerkPayload();
    await expect(createUser(payload)).rejects.toThrow(InternalServerError);
  });
});

/**
 * Tests for the updateUser function
 */

describe("updateUser", () => {
  it("throws NotFoundError when the user does not exist", async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null); // Simulate user not found

    await expect(
      updateUser("non_existent_clerk_id", { fullName: "NewName" }),
    ).rejects.toThrow(NotFoundError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "non_existent_clerk_id" },
    });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it("updates the user when the user exists", async () => {
    const existingUser = makeDBUser({ clerkId: "existing_clerk_id" });
    const updateData = { fullName: "New Name" };
    const updatedUser = { ...existingUser, ...updateData };

    prisma.user.findUnique.mockResolvedValueOnce(existingUser); // Simulate user found
    prisma.user.update.mockResolvedValueOnce(updatedUser); // Simulate successful update

    await expect(updateUser("existing_clerk_id", updateData)).resolves.toEqual(
      updatedUser,
    );

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
      data: updateData,
    });
  });

  it("throws InternalServerError when there is an error during user find", async () => {
    // Simulate an error during user find
    prisma.user.findUnique.mockRejectedValueOnce(new Error("Database error"));

    await expect(
      updateUser("existing_clerk_id", { fullName: "New Name" }),
    ).rejects.toThrow(InternalServerError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it("throws InternalServerError when there is an error during user update", async () => {
    const existingUser = makeDBUser({ clerkId: "existing_clerk_id" });
    // Simulate user found
    prisma.user.findUnique.mockResolvedValueOnce(existingUser);

    // Simulate an error during user update
    prisma.user.update.mockRejectedValueOnce(
      new Error("Failed to update user: Database error"),
    );

    await expect(
      updateUser("existing_clerk_id", { fullName: "New Name" }),
    ).rejects.toThrow(InternalServerError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
      data: {
        fullName: "New Name",
      },
    });
  });
});

/**
 * Tests for the deleteUser function
 */

describe("deleteUser", () => {
  it("throws NotFoundError when the user does not exist", async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null); // Simulate user not found
    await expect(deleteUser("non_existent_clerk_id")).rejects.toThrow(
      NotFoundError,
    );
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "non_existent_clerk_id" },
    });
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });

  it("deletes the user when the user exists", async () => {
    const existingUser = makeDBUser({ clerkId: "existing_clerk_id" });
    const deletedUser = { ...existingUser }; // Simulate the deleted user returned by Prisma
    prisma.user.findUnique.mockResolvedValueOnce(existingUser);
    prisma.user.delete.mockResolvedValueOnce(deletedUser);

    const result = await deleteUser("existing_clerk_id");

    expect(result).toBe(deletedUser);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
  });

  it("throws InternalServerError when there is an error during user find", async () => {
    // Simulate an error during user find
    prisma.user.findUnique.mockRejectedValueOnce(new Error("Database error"));
    await expect(deleteUser("existing_clerk_id")).rejects.toThrow(
      InternalServerError,
    );
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });

  it("throws InternalServerError when there is an error during user delete", async () => {
    const existingUser = makeDBUser({ clerkId: "existing_clerk_id" });
    // Simulate user found
    prisma.user.findUnique.mockResolvedValueOnce(existingUser);
    // Simulate an error during user delete
    prisma.user.delete.mockRejectedValueOnce(new Error("Database error"));

    await expect(deleteUser("existing_clerk_id")).rejects.toThrow(
      InternalServerError,
    );

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
  });
});

describe.each([
  ["ClerkId", "clerkId", getUserByClerkId, "clerk_abc"],
  ["Email", "email", getUserByEmail, "a@b.com"],
  ["Username", "username", getUserByUsername, "username123"],
])("getUserBy%s", (label, dbName, serviceFunc, testValue) => {
  it(`returns the user when the user with ${label} exists`, async () => {
    const mockUser = makeDBUser({ [dbName]: testValue });
    prisma.user.findUnique.mockResolvedValueOnce(mockUser); // Simulate user found
    const result = await serviceFunc(testValue);
    expect(result).toBe(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { [dbName]: testValue },
    });
  });

  it(`throws NotFoundError when the user with ${label} does not exist`, async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null); // Simulate user not found
    await expect(serviceFunc(testValue)).rejects.toThrow(NotFoundError);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { [dbName]: testValue },
    });
  });

  it(`throws InternalServerError when there is an error during user find by ${label}`, async () => {
    // Simulate an error during user find
    prisma.user.findUnique.mockRejectedValueOnce(new Error("Database error"));
    await expect(serviceFunc(testValue)).rejects.toThrow(InternalServerError);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { [dbName]: testValue },
    });
  });
});
