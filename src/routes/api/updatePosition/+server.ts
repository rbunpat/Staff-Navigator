import { db } from '$lib/server/database';

export async function GET({ request, response }) {
	console.log('bruh');
	return new Response(
		JSON.stringify({
			message: 'Not found',
			status: 404
		}),
		{
			status: 400
		}
	);
}

export async function POST({ request }) {
	try {
		const { apiKey, lat, lon } = await request.json();
		const caneId = await db.devToken.findFirst({
			where: { devToken: apiKey },
			select: { caneId: true }
		});

		await db.coordinates.create({
			data: {
				caneId: caneId.caneId,
				latitude: lat,
				longitude: lon
			}
		});


	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'Error',
				status: 400
			}),
			{
				status: 400
			}
		);
	}
}
