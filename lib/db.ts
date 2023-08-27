/* Best practice for instantiating PrismaClient with Next.js
https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

globalThis: The purpose of globalThis is to provide a standardized way to access the global object 
regardless of the context. This simplifies the process of writing cross-environment JavaScript code 
and ensures consistency in accessing the global object.*/


import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db