import prisma from "../../lib/prisma.js";
import {
  UnprocessableEntityError,
  ConflictError,
  NotFoundError,
  InternalServerError,
} from "../../lib/errors/AppError.js";

import type {
  CreateUserPayloadData,
  UpdateUserPayloadData,
  DeleteUserPayloadData,
} from "./users.types.js";
import { toUserCreateInput, toUserUpdateData } from "./users.types.js";

export const createUser = async (data: CreateUserPayloadData) => {
  const userCreateInput = toUserCreateInput(data);
  // Check if the user already exists in the database
  const existingEmailUser = await prisma.user.findUnique({
    where: { email: userCreateInput.email },
  });

  if (existingEmailUser) {
    // console.error(`User with email ${email} already exists`);
    throw new ConflictError("User with this email already exists");
  }

  const existingUsernameUser = await prisma.user.findUnique({
    where: { username: userCreateInput.username },
  });
  if (existingUsernameUser) {
    // console.error(`User with username ${username} already exists`);
    throw new ConflictError("User with this username already exists");
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        ...userCreateInput,
      },
    });
    return newUser;
  } catch (error: any) {
    // console.error(`Error creating user ${username}:`, error);
    throw new InternalServerError(
      `Failed to create user ${userCreateInput.username} : ${error.message}`,
    );
  }
};

export const updateUser = async (updateData: UpdateUserPayloadData) => {
  const userUpdateData = toUserUpdateData(updateData);
  const clerkId = updateData.data.id;
  let userExisting;
  try {
    userExisting = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });
  } catch (error: any) {
    // console.error(`Error fetching user ${clerkId}:`, error);
    throw new InternalServerError(`Failed to fetch user: ${error.message}`);
  }

  if (!userExisting) {
    // console.error(`User with username ${updateData.username} not found`);
    throw new NotFoundError(`User with This ID: ${clerkId} not found`);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: userUpdateData,
    });
    return updatedUser;
  } catch (error: any) {
    // console.error(`Error updating user ${clerkId}:`, error);
    throw new InternalServerError(`Failed to update user: ${error.message}`);
  }
};

export const deleteUser = async (data: DeleteUserPayloadData) => {
  const clerkId = data.data.id;
  let userExisting;
  try {
    userExisting = await prisma.user.findUnique({
      where: { clerkId },
    });
  } catch (error: any) {
    console.error(`Error fetching user ${clerkId}:`, error);
    throw new InternalServerError(`Failed to fetch user: ${error.message}`);
  }

  if (!userExisting) {
    throw new NotFoundError(`User with ID ${clerkId} not found`);
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { clerkId },
    });
    return deletedUser;
  } catch (error: any) {
    // console.error(`Error deleting user ${clerkId}:`, error);
    throw new InternalServerError(`Failed to delete user: ${error.message}`);
  }
};

export const getUserByEmail = async (email: string) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email },
    });
  } catch (error: any) {
    // console.error(`Error fetching user by email ${email}:`, error);
    throw new InternalServerError(
      `Failed to fetch user by email: ${error.message}`,
    );
  }

  if (!user) {
    throw new NotFoundError(`User with email ${email} not found`);
  }
  return user;
};

export const getUserByUsername = async (username: string) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { username },
    });
  } catch (error: any) {
    console.error(`Error fetching user by username ${username}:`, error);
    throw new InternalServerError(
      `Failed to fetch user by username: ${error.message}`,
    );
  }

  if (!user) {
    throw new NotFoundError(`User with username ${username} not found`);
  }

  return user;
};

export const getUserByClerkId = async (clerkId: string) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { clerkId },
    });
  } catch (error: any) {
    console.error(`Error fetching user by ID ${clerkId}:`, error);
    throw new InternalServerError(
      `Failed to fetch user by ID: ${error.message}`,
    );
  }

  if (!user) {
    throw new NotFoundError(`User with ID ${clerkId} not found`);
  }

  return user;
};
