import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const GET = async (req) => {
  try {
    const users = await db.Condition.findMany({
      orderBy: [
        { name: 'desc' }
      ]
    });
    return NextResponse.json({ users, status: 200 })
  } catch (error) {
    console.log(error);
  }
}
