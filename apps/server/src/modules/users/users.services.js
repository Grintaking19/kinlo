import prisma from "../../prisma/client.js";
import {
  UnprocessableEntityError,
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../lib/errors/AppError.js";

export const createUser = async (data) => {
  const { id, first_name, last_name, username, email_addresses } = data;
  const email = email_addresses[0]?.email_address || null;
  const fullName = `${first_name} ${last_name}`.trim();
  const clerkId = id;

  if (!email) {
    throw new UnprocessableEntityError("Email is required");
  }

  // Check if the user already exists in the database
  const existingEmailUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmailUser) {
    throw new ConflictError("User with this email already exists");
  }

  const existingUsernameUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsernameUser) {
    throw new ConflictError("User with this username already exists");
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        fullName,
        clerkId,
      },
    });
    return newUser;
  } catch (error) {
    throw new BadRequestError(
      `Failed to create user ${username} : ${error.message}`,
    );
  }
};

export const updateUser = async (clerkId, updateData) => {
  let userExisting;
  try {
    userExisting = await prisma.user.findUnique({
      where: { clerkId },
    });
  } catch (error) {
    console.error(`Error fetching user ${clerkId}:`, error);
    throw new BadRequestError(`Failed to fetch user: ${error.message}`);
  }

  if (!userExisting) {
    throw new NotFoundError(
      `User with username ${updateData.username}, not found`,
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: updateData,
    });
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user ${clerkId}:`, error);
    throw new BadRequestError(`Failed to update user: ${error.message}`);
  }
};

export const deleteUser = async (clerkId) => {
  let userExisting;
  try {
    userExisting = await prisma.user.findUnique({
      where: { clerkId },
    });
  } catch (error) {
    console.error(`Error fetching user ${clerkId}:`, error);
    throw new BadRequestError(`Failed to fetch user: ${error.message}`);
  }

  if (!userExisting) {
    throw new NotFoundError(`User with ID ${clerkId} not found`);
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { clerkId },
    });
    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user ${clerkId}:`, error);
    throw new BadRequestError(`Failed to delete user: ${error.message}`);
  }
};

export const getUserByEmail = async (email) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(`Error fetching user by email ${email}:`, error);
    throw new BadRequestError(
      `Failed to fetch user by email: ${error.message}`,
    );
  }

  if (!user) {
    throw new NotFoundError(`User with email ${email} not found`);
  }
  return user;
};

export const getUserByUsername = async (username) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    console.error(`Error fetching user by username ${username}:`, error);
    throw new BadRequestError(
      `Failed to fetch user by username: ${error.message}`,
    );
  }

  if (!user) {
    throw new NotFoundError(`User with username ${username} not found`);
  }

  return user;
};

export const getUserById = async (id) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error);
    throw new BadRequestError(`Failed to fetch user by ID: ${error.message}`);
  }

  if (!user) {
    throw new NotFoundError(`User with ID ${id} not found`);
  }

  return user;
};
