import { redirect } from '@sveltejs/kit'

export const load = async ({ cookies }) => {
	// redirect user if logged in
    const token = cookies.get('token')
    if (!token) {
        throw redirect(302, '/login')
    }
   
}