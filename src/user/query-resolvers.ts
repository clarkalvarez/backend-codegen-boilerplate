import { db } from "../db";
import { QueryResolvers } from "../generated/graphql";

export const getUsers: QueryResolvers["getUsers"] = async () => {
  return await db.prismaExample.user.findMany();
};

export const getUserByID: QueryResolvers["getUserByID"] = async (_, { id }) => {
  return db.prismaExample.user.findFirst({
    where: { id: parseInt(id) },
  });
};
