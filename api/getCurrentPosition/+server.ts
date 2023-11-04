import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { db } from '$lib/server/database';

export async function GET({ request, response }) {
	console.log('bruh');
	return new Response(
		JSON.stringify({
			message: 'Not found',
            status: 404,
		}),
		{
            status: 400,
        }
	);
}

export async function POST({ request }) {

    try {
        const { apiKey } = await request.json();

        const caneId = await db.devToken.findFirst({
            where: { devToken: apiKey },
            select: { caneId: true }
        })

        const cords = await db.coordinates.findFirst({
            where: { caneId: caneId.caneId },
            select: { latitude: true, longitude: true }
        })

        return new Response(
            JSON.stringify({
                message: "Success",
                caneId: caneId.caneId,
                latitude: cords.latitude,
                longitude: cords.longitude,
                status: 200,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Error',
                status: 400,
            }),
            {
                status: 400,
            }
        );
        
    }


}
