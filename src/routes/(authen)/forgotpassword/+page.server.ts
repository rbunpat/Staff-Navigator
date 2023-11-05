import { fail, redirect } from '@sveltejs/kit'

import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { db } from '$lib/server/database'

import { sendMail } from '$lib/mail/sendmail'

export const load = async ({ cookies }) => {
	// redirect user if logged in
    const token = cookies.get('token')
    if (token) {
        throw redirect(302, '/')
    }
}

export const actions = {
    forgotpassword: async ({ request }) => {
        const data = await request.formData()
        const email = data.get('email')

        // validate user input
        if (typeof email !== 'string' || !email) {
            return fail(400, { invalid: true })
        }

        //check if email exists in db
        const user = await db.user.findUnique({ where: { email } })
        if (!user) {
            return fail(400, { invalid: true })
        }

        const userId = await db.user.findUnique({ where: { email }, select: { id: true } })

        // generate password reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenHash = await bcrypt.hashSync(resetToken, 10)
        //@ts-ignore
        const link = import.meta.env.VITE_APPURL + '/resetpassword/?id=' + userId.id + '&token=' + resetToken

        // set token in db
        // await db.passwordReset.create({
        //     data: {
        //         userId: userId.id,
        //         resetTokenHash: resetTokenHash
        //     }
        // })

        await db.passwordReset.upsert({
            where: { userId: userId.id },
            update: { resetTokenHash: resetTokenHash },
            create: { userId: userId.id, resetTokenHash: resetTokenHash },
        })

        // send email
        await sendMail(email, 'Password Reset', link)
        
        //redirect to login page
        throw redirect(302, '/login')
    }
}
