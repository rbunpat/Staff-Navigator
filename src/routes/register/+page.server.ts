import { fail, redirect } from '@sveltejs/kit'

import bcrypt from 'bcrypt'

import { db } from '$lib/server/database'

interface TokenValidateResponse {
    'error-codes': string[];
    success: boolean;
    action: string;
    cdata: string;
}

async function validateTurnstileToken(token:any, secret: string) {
    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                response: token,
                secret: secret,
            }),
        },
    );

    const data: TokenValidateResponse = await response.json();

    return {
        // Return the status
        success: data.success,

        // Return the first error if it exists
        error: data['error-codes']?.length ? data['error-codes'][0] : null,
    };
}

export const load = async ({ cookies }) => {
	// redirect user if logged in
    const token = cookies.get('token')
    if (token) {
        throw redirect(302, '/')
    }
}

export const actions = {
    register: async ({ request }) => {

        //get data from body
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        const caneSerial = data.get('caneserial')
        const token = data.get('cf-turnstile-response')

        //check turnstile token
        const { success, error } = await validateTurnstileToken(token, import.meta.env.VITE_TURNSTILESECRET)
        if (!success) {
            return fail(400, { captcha: true })
        }

        //validate data type of user input
        if (typeof email !== 'string' || typeof password !== 'string' || typeof caneSerial !== 'string' || !email || !password || !caneSerial) {
            return fail(400, { invalid: true })
        }

        //check if email or cane serail already exists in db
        const user = await db.user.findUnique({ where: { email } })
        if (user) {
            return fail(400, { email: true })
        }

        //check if cane serial already exists in db
        const cane = await db.user.findFirst({ where: { caneId: caneSerial } })
        if (cane) {
            return fail(400, { cane: true })
        }

        //generate password hash
        const hash = await bcrypt.hashSync(password, 10)

        //add user detail to db
        await db.user.create({
            data: {
                email: email,
                passwordHash: hash,
                caneId: caneSerial
            }
        })

        //redirect user to login page
        throw redirect(302, '/login')
    }
}