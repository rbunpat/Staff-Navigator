import { fail, redirect } from '@sveltejs/kit'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db } from '$lib/server/database'

export const load = async ({ cookies }) => {
	// redirect user if logged in
    const token = cookies.get('token')
    if (token) {
        throw redirect(302, '/map')
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        //get login data from body
        const data = await request.formData()
		const email = data.get('email')
		const password = data.get('password')

        //validate data type of user input
        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
            return fail(400, { invalid: true })
        }

        //check email
        const user = await db.user.findUnique({ where: { email } })
        if (!user) {
            return fail(400, { credentials: true })
        }

        //check password
        const userPassword = await bcrypt.compare(password, user.passwordHash)
        if (!userPassword) {
			return fail(400, { credentials: true })
		}

        //set token
        const token = jwt.sign({ email }, import.meta.env.VITE_JWTSECRET)
        cookies.set('token', token, { path: '/' })

        //redirect user to dashboard
        throw redirect(302, '/map')
    }
}
