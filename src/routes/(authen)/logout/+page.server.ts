import { invalidateAll } from '$app/navigation'
import { redirect } from '@sveltejs/kit'

export const actions = {
	logout: ({ cookies }) => {
		// byebye cookie
		cookies.delete('token')

		// redirect the user
		throw redirect(302, '/')
	},
}
