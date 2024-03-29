import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken'


export const load = async ({ cookies }) => {
    const token = cookies.get('token')
    if (token) {
        try {
            const email = jwt.verify(token, import.meta.env.VITE_JWTSECRET).email
            const user = true;
            throw redirect(302, '/map');
            return { user, email };
        } catch (error) {
            const user = false;
            throw redirect(302, '/map');
            return { user };
        }

    }
    if (!token) {
        // const user = false;
        // return { user };
        throw redirect(302, '/login');
    }
}
