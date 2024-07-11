import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
import { writeFile } from "fs/promises";

const db = new PrismaClient();

export const POST = async (req) => {
    try {
        const data = await req.formData();
        let path = '';

        const image = data.get('thumbnail');
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            path = `public/uploads/articles/${image.name}`;
            await writeFile(path, buffer);
        }

        const topic = data.get('topic');
        const source = data.get('source');
        const author = data.get('author');
        const youtubeLink = data.get('youtubeLink');
        const shortDescription = data.get('shortDescription');
        const longDescription = data.get('longDescription');

        const articleData = {
            topic: topic,
            source: source,
            author: author,
            youtubeLink: youtubeLink,
            shortDescription: shortDescription,
            longDescription: longDescription,
            thumbnail: path,
        };

        const user = await db.nmu.create({
            data: articleData,
        });
        console.log(user)
        return NextResponse.json({ user, status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add article', status: 500 });
    }
};
