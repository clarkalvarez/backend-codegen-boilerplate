import { Resolvers } from "./generated/graphql";
import { getUsers, getUserByID } from "./user/query-resolvers";
import { createUser, deleteUser, updateUser } from "./user/mutation-resolvers";

// import { createUser } from "./user/mutation-resolvers";

export const resolvers: Resolvers = {
  Query: {
    getUsers,
    getUserByID,
  },
  Mutation: {
    createUser,
    deleteUser,
    updateUser,
  },
};
