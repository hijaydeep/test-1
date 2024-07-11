import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const POST = async (req) => {
    try {
        const data = await req.json();
        const user = await db.user.create({
            data: data,
        });
        console.log(user)
        return NextResponse.json({ user, status: 200 })
    } catch (error) {
        console.log(error);
    }
}
