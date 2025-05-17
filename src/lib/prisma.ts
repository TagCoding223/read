import { PrismaClient } from "../../generated/prisma";

let prisma: PrismaClient

declare global{
    let prisma: PrismaClient | undefined;
}

if (!global.prisma) {
    global.prisma = new PrismaClient()
}

prisma = global.prisma