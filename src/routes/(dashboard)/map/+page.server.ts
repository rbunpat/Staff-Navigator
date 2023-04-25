import { redirect, error } from '@sveltejs/kit'

import jwt from 'jsonwebtoken'

import { db } from '$lib/server/database'

export const load = async ({ cookies }) => {
	// redirect user if logged in
    const token = cookies.get('token')
    if (!token) {
        throw error(401, 'Unauthorized')
        // throw redirect(302, '/')
    }

    const email = jwt.verify(token, import.meta.env.VITE_JWTSECRET).email
    const user = await db.user.findUnique({ where: { email }})
    if (!user) {
        throw redirect(302, '/')
    }

    try {
        const cane = await db.user.findUnique({ where: { email }, select: { caneId: true } })
        const caneId = cane.caneId
    
        const location = await db.coordinates.findMany({ where: { caneId }, select: { latitude: true, longitude: true, createdAt: true}, orderBy: {createdAt: 'desc'}})
        const lat = location[0].latitude
        const lon = location[0].longitude
        const createdAt = location[0].createdAt
        return { lat, lon, createdAt, found: true}
    } catch (error) {
        return { lat: 0, lon: 0, createdAt: '', found: false}
    }
    
}
