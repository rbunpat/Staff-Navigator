import { redirect } from '@sveltejs/kit'

export const load = async ({ cookies }) => {
    //bye bye token
    cookies.set('token', '', { path: '/' })
	throw redirect(302, '/')
}
