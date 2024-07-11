import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';

const db = new PrismaClient();

export const DELETE = async (req, { params }) => {
    console.log('jaydeep')
    const id = parseInt(params.id);
    try {
        const article = await db.nmu.findUnique({
            where: { id: id },
            select: { thumbnail: true }
        });

        if (article) {
            if (article.thumbnail) {
                await unlink(article.thumbnail);
                await db.nmu.update({
                    where: { id: id },
                    data: { thumbnail: null }
                });
                return NextResponse.json({ message: 'Image deleted successfully', status: 200 });
            } else {
                return NextResponse.json({ message: 'No image found for this article', status: 404 });
            }
        } else {
            return NextResponse.json({ error: 'Article not found', status: 404 });
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ message: 'Error deleting image', status: 500 });
    }
};