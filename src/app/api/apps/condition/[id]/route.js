import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const GET = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const condition = await db.Condition.findUnique({
            where: { id: id },
        });
        console.log(condition)
        return NextResponse.json({ condition, status: 200 });
    } catch (error) {
        console.log(error);
    }
}

export const PUT = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const data = await req.json();
        const updatedCondition = await db.Condition.update({
            where: { id: id },
            data: data,
        });
        console.log(updatedCondition)
        return NextResponse.json({ updatedCondition, status: 200 });
    } catch (error) {
        console.log(error);
    }
}


export const DELETE = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const condition = await db.Condition.delete({
            where: { id: id },
        });
        console.log(condition)
        return NextResponse.json({ condition, status: 200 })
    } catch (error) {
        console.log(error);
    }
}

