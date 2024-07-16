import { PrismaClient } from "@prisma/client";

export interface MyContext {
  authScope?: string;
  client?: PrismaClient;
  headers?: String[];
}
