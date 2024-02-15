import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import { settings } from "../settings";

const adapter = new PrismaPg({ connectionString: settings.db.url });
const prisma = new PrismaClient({ adapter });

export { prisma };
