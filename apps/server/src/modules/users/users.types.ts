import type { Prisma } from "../../generated/prisma/client.js";
import { UnprocessableEntityError } from "../../lib/errors/AppError.js";

type ClerkEmailAddress = {
  email_address: string;
  id: string;
  verification?: {
    status: string;
    strategy: string;
  };
};

type ClerkUserData = {
  id: string;
  email_addresses: ClerkEmailAddress[];
  first_name: string;
  last_name: string;
  username: string;
  image_url?: string;
};


export type CreateUserPayloadData = {
  type: "user.created";
  data: ClerkUserData;
};

export type UpdateUserPayloadData = {
  type: "user.updated";
  data: Pick<ClerkUserData, "id"> & Partial<Omit<ClerkUserData, "id">>;
};

export type DeleteUserPayloadData = {
  type: "user.deleted";
  data: {
    id: string;
    deleted: boolean;
  };
};

export function toUserCreateInput(
  payload: CreateUserPayloadData,
): Prisma.UserCreateInput {
  const email = payload.data.email_addresses[0]?.email_address;
  const first_name = payload.data.first_name;
  const last_name = payload.data.last_name;
  const username = payload.data.username;

  if (!first_name || !last_name) {
    // console.error("First name and last name are required to create a user");
    throw new UnprocessableEntityError(
      "First name and last name are required to create a user",
    );
  }

  if (!email || email.trim() === "" || !username || username.trim() === "") {
    // console.error("Email is required to create a user");
    throw new UnprocessableEntityError("Email and username are required");
  }

  return {
    clerkId: payload.data.id,
    email: email,
    username: username,
    fullName: `${first_name} ${last_name}`.trim(),
  };
}



export function toUserUpdateData(
  payload: UpdateUserPayloadData,
): Prisma.UserUpdateInput {
  const { data } = payload;
  const updateData: Prisma.UserUpdateInput = {};

  const email = data.email_addresses?.[0]?.email_address;

  if (email) {
    updateData.email = email;
  }

  if (data.username) {
    updateData.username = data.username;
  }

  if (data.first_name && data.last_name) {
    updateData.fullName = `${data.first_name} ${data.last_name}`.trim();
  }

  if (Object.keys(updateData).length === 0) {
    throw new UnprocessableEntityError(
      "User update payload contains no supported fields",
    );
  }

  return updateData;
}