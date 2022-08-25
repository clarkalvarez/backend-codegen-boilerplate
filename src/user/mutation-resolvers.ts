import { db } from "../db";
import { MutationResolvers } from "../generated/graphql";
import * as bcrypt from "bcrypt";

export const createUser: MutationResolvers["createUser"] = async (_, args) => {
  const hashedPassword = await bcrypt.hash(args.data.password, 10);
  return db.prismaExample.user.create({
    data: {
      email: args.data.email,
      name: args.data.name,
      password: hashedPassword,
    },
  });
};

export const updateUser: MutationResolvers["updateUser"] = async (_, args) => {
  const user = await db.prismaExample.user.findUnique({
    where: { id: parseInt(args.id) },
  });
  if (!user) {
    throw new Error(`No user found for id: ${args.id}`);
  }

  let hashedPassword = user.password;
  if (args.password) {
    hashedPassword = await bcrypt.hash(args.password, 10);
  }
  if (args.email) {
    const userByEmail = await db.prismaExample.user.findUnique({
      where: { email: args.email },
    });
    if (userByEmail) {
      throw new Error(`User with email: ${args.email} already exists`);
    }
  }

  const updatedUser = await db.prismaExample.user.update({
    where: { id: parseInt(args.id) },
    data: {
      name: args.name || user.name,
      email: args.email || user.email,
      password: hashedPassword || user.password,
    },
  });
  return updatedUser;
};

export const deleteUser: MutationResolvers["deleteUser"] = async (
  _,
  { id }
) => {
  const user = await db.prismaExample.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!user) {
    throw new Error(`No user found for id: ${parseInt(id)}`);
  }

  const deletedUser = await db.prismaExample.user.delete({
    where: { id: parseInt(id) },
  });

  return deletedUser;
};
