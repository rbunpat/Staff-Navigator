import { invalidateAll } from '$app/navigation'
import { redirect } from '@sveltejs/kit'

export const load = async () => {
	throw redirect(302, '/')
}

export const actions = {
	default({ cookies }) {
		// byebye cookie
		cookies.delete('token')

		// redirect the user
		throw redirect(302, '/')
	},
}
