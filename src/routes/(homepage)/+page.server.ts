import jwt from 'jsonwebtoken'

export const load = async ({ cookies }) => {
    const token = cookies.get('token')
    if (token) {
        try {
            const email = jwt.verify(token, import.meta.env.VITE_JWTSECRET).email
            const user = true;
            return { user, email };
        } catch (error) {
            const user = false;
            return { user };
        }
    }
    if (!token) {
        const user = false;
        return { user };
    }
}