import { PrismaClient, Prisma } from "@prisma/client";

const prismaExample = new PrismaClient();

export const db = {
  prismaExample,
  Prisma,
};
