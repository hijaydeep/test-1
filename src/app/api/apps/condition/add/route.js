import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const POST = async (req) => {
    try {
        const data = await req.json();
        const condition = await db.Condition.create({
            data: data,
        });
        console.log(condition)
        return NextResponse.json({ condition, status: 200 })
    } catch (error) {
        console.log(error);
    }
}
