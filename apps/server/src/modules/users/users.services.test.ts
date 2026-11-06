import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import prisma from "../../lib/prisma.js";

vi.mock("../../lib/prisma.js", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import type {
  CreateUserPayloadData,
  UpdateUserPayloadData,
  DeleteUserPayloadData,
} from "./users.types.js";

let errorSpy: ReturnType<typeof vi.spyOn> | undefined;

beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  errorSpy?.mockRestore();
  errorSpy = undefined;
});

const mockedPrisma = vi.mocked(prisma, { deep: true });

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
import type { User } from "../../generated/prisma/client.js";

// Factory functions to create valid Clerk webhook events with optional overrides

const makeCreatedEvent = (dataOverrides = {}): CreateUserPayloadData => ({
  type: "user.created",
  data: {
    id: "user_id",
    first_name: "Test",
    last_name: "User",
    username: "testuser",
    email_addresses: [
      {
        email_address: "user@example.com",
        id: "user_email_id",
      },
    ],
    ...dataOverrides,
  },
});

const makeUpdatedEvent = (dataOverrides = {}): UpdateUserPayloadData => ({
  type: "user.updated",
  data: {
    id: "user_id",
    ...dataOverrides,
  },
});

const makeDeletedEvent = (dataOverrides = {}): DeleteUserPayloadData => ({
  type: "user.deleted",
  data: {
    id: "user_id",
    deleted: true,
    ...dataOverrides,
  },
});

const makeUser = (overrides: Partial<User> = {}): User => ({
  id: "user_123",
  clerkId: "user_clerk_id",
  email: "user@example.com",
  fullName: "Test User",
  username: "testuser",
  createdAt: new Date(),
  updatedAt: new Date(),
  bio: null,
  location: null,
  work: null,
  education: null,
  birthday: null,
  avatarUrl: null,
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
      const payload = makeCreatedEvent(overrides);

      // Act & Assert
      await expect(createUser(payload)).rejects.toThrow(
        UnprocessableEntityError,
      );

      // Validation must fail before any database call is made
      expect(mockedPrisma.user.findUnique).not.toHaveBeenCalled();
    },
  );

  it("throws ConflictError when a user with the same email already exists", async () => {
    mockedPrisma.user.findUnique.mockResolvedValueOnce(
      makeUser({ id: "existing_user_id" }),
    ); // Simulate existing user

    const payload = makeCreatedEvent();

    await expect(createUser(payload)).rejects.toThrow(ConflictError);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: payload.data.email_addresses[0]?.email_address },
    });
    expect(mockedPrisma.user.create).not.toHaveBeenCalled();
  });

  it("throws ConflictError when a user with the same username already exists", async () => {
    // Simulate no existing user with the same email
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate existing user with the same username
    mockedPrisma.user.findUnique.mockResolvedValueOnce(
      makeUser({ id: "existing_user_id" }),
    );

    const payload = makeCreatedEvent();

    await expect(createUser(payload)).rejects.toThrow(ConflictError);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: payload.data.email_addresses[0]?.email_address },
    });
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: payload.data.username },
    });
    expect(mockedPrisma.user.create).not.toHaveBeenCalled();
  });

  it("creates a new user when the email and username are unique", async () => {
    // Simulate no existing user with the same email
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate no existing user with the same username
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate successful creation
    const createdUser = makeUser({ id: "new_user_id" });
    mockedPrisma.user.create.mockResolvedValueOnce(createdUser);

    const payload = makeCreatedEvent();

    await expect(createUser(payload)).resolves.toEqual(createdUser);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: payload.data.email_addresses[0]?.email_address },
    });
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: payload.data.username },
    });

    expect(mockedPrisma.user.create).toHaveBeenCalledWith({
      data: {
        email: "user@example.com",
        clerkId: "user_id",
        fullName: "Test User",
        username: "testuser",
      },
    });
  });

  it("throws InternalServerError when there is an error during user creation", async () => {
    // Simulate no existing user with the same email
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate no existing user with the same username
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
    // Simulate an error during user creation
    mockedPrisma.user.create.mockRejectedValueOnce(
      new Error("Database error during user creation"),
    );
    const payload = makeCreatedEvent();
    await expect(createUser(payload)).rejects.toThrow(InternalServerError);
  });
});

/**
 * Tests for the updateUser function
 */

describe("updateUser", () => {
  it("throws NotFoundError when the user does not exist", async () => {
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null); // Simulate user not found

    await expect(
      updateUser(
        makeUpdatedEvent({
          id: "non_existent_clerk_id",
          first_name: "Someone",
          last_name: "Else",
        }),
      ),
    ).rejects.toThrow(NotFoundError);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "non_existent_clerk_id", },
    });
    expect(mockedPrisma.user.update).not.toHaveBeenCalled();
  });

  it("updates the user when the user exists", async () => {
    const existingUser = makeUser({ clerkId: "existing_clerk_id" });
    const updatedUser = { ...existingUser, fullName: "Updated User" };

    mockedPrisma.user.findUnique.mockResolvedValueOnce(existingUser); // Simulate user found
    mockedPrisma.user.update.mockResolvedValueOnce(updatedUser); // Simulate successful update

    await expect(
      updateUser(
        makeUpdatedEvent({
          id: "existing_clerk_id",
          first_name: "Updated",
          last_name: "User",
        }),
      ),
    ).resolves.toEqual(updatedUser);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(mockedPrisma.user.update).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
      data: {
        fullName: "Updated User",
      },
    });
  });

  it("throws InternalServerError when there is an error during user find", async () => {
    // Simulate an error during user find
    mockedPrisma.user.findUnique.mockRejectedValueOnce(
      new Error("Database error"),
    );

    await expect(
      updateUser(
        makeUpdatedEvent({
          id: "existing_clerk_id",
          first_name: "New",
          last_name: "Name",
        }),
      ),
    ).rejects.toThrow(InternalServerError);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(mockedPrisma.user.update).not.toHaveBeenCalled();
  });

  it("throws InternalServerError when there is an error during user update", async () => {
    const existingUser = makeUser({ clerkId: "existing_clerk_id" });
    // Simulate user found
    mockedPrisma.user.findUnique.mockResolvedValueOnce(existingUser);

    // Simulate an error during user update
    mockedPrisma.user.update.mockRejectedValueOnce(
      new Error("Failed to update user: Database error"),
    );

    await expect(
      updateUser(
        makeUpdatedEvent({
          id: "existing_clerk_id",
          first_name: "New",
          last_name: "Name",
        }),
      ),
    ).rejects.toThrow(InternalServerError);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(mockedPrisma.user.update).toHaveBeenCalledWith({
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
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null); // Simulate user not found
    await expect(
      deleteUser(makeDeletedEvent({ id: "non_existent_clerk_id" })),
    ).rejects.toThrow(NotFoundError);
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "non_existent_clerk_id" },
    });
    expect(mockedPrisma.user.delete).not.toHaveBeenCalled();
  });

  it("deletes the user when the user exists", async () => {
    const existingUser = makeUser({ clerkId: "existing_clerk_id" });
    const deletedUser = { ...existingUser }; // Simulate the deleted user returned by Prisma
    mockedPrisma.user.findUnique.mockResolvedValueOnce(existingUser);
    mockedPrisma.user.delete.mockResolvedValueOnce(deletedUser);

    const result = await deleteUser(
      makeDeletedEvent({ id: "existing_clerk_id" }),
    );

    expect(result).toBe(deletedUser);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });

    expect(mockedPrisma.user.delete).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
  });

  it("throws InternalServerError when there is an error during user find", async () => {
    // Simulate an error during user find
    mockedPrisma.user.findUnique.mockRejectedValueOnce(
      new Error("Database error"),
    );
    await expect(
      deleteUser(makeDeletedEvent({ id: "existing_clerk_id" })),
    ).rejects.toThrow(InternalServerError);
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
    expect(mockedPrisma.user.delete).not.toHaveBeenCalled();
  });

  it("throws InternalServerError when there is an error during user delete", async () => {
    const existingUser = makeUser({ clerkId: "existing_clerk_id" });
    // Simulate user found
    mockedPrisma.user.findUnique.mockResolvedValueOnce(existingUser);
    // Simulate an error during user delete
    mockedPrisma.user.delete.mockRejectedValueOnce(new Error("Database error"));

    await expect(
      deleteUser(makeDeletedEvent({ id: "existing_clerk_id" })),
    ).rejects.toThrow(InternalServerError);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "existing_clerk_id" },
    });
    expect(mockedPrisma.user.delete).toHaveBeenCalledWith({
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
    const mockUser = makeUser({ [dbName]: testValue });
    mockedPrisma.user.findUnique.mockResolvedValueOnce(mockUser); // Simulate user found
    const result = await serviceFunc(testValue);
    expect(result).toBe(mockUser);
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { [dbName]: testValue },
    });
  });

  it(`throws NotFoundError when the user with ${label} does not exist`, async () => {
    mockedPrisma.user.findUnique.mockResolvedValueOnce(null); // Simulate user not found
    await expect(serviceFunc(testValue)).rejects.toThrow(NotFoundError);
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { [dbName]: testValue },
    });
  });

  it(`throws InternalServerError when there is an error during user find by ${label}`, async () => {
    // Simulate an error during user find
    mockedPrisma.user.findUnique.mockRejectedValueOnce(
      new Error("Database error"),
    );
    await expect(serviceFunc(testValue)).rejects.toThrow(InternalServerError);
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { [dbName]: testValue },
    });
  });
});
