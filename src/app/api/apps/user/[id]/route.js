import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const GET = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const user = await db.user.findUnique({
            where: { id: id },
        });
        console.log(user)
        return NextResponse.json({ user, status: 200 });
    } catch (error) {
        console.log(error);
    }
}

export const PUT = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const data = await req.json();
        const updateduser = await db.user.update({
            where: { id: id },
            data: data,
        });
        console.log(updateduser)
        return NextResponse.json({ updateduser, status: 200 });
    } catch (error) {
        console.log(error);
    }
}


export const DELETE = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const user = await db.user.delete({
            where: { id: id },
        });
        console.log(user)
        return NextResponse.json({ user, status: 200 })
    } catch (error) {
        console.log(error);
    }
}

