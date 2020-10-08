import { PrismaClient } from '@prisma/client';
// Configuration - so that Nexus knows the type of our GQL context

export interface Context {
    db: PrismaClient
}