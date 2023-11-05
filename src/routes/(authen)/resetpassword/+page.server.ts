import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'

import { db } from '$lib/server/database'

export const actions = {
    resetpassword : async ({ request }) => {

        //get login data from body
        const data = await request.formData()
        const password = data.get('password')
        const passwordConfirm = data.get('confirm-password')
        const id = data.get('id')
        const token = data.get('token')

        //validate data type of user input
        if (typeof password !== 'string' || typeof id !== 'string' || typeof token !== 'string' || !password || !id || !token) {
            return fail(400, { invalid: true })
        }

        //validate password
        if (password !== passwordConfirm) {
            return fail(400, { password: true })
        }

        //check if userid in passreset db
        const user = await db.passwordReset.findUnique({ where: { userId: id } })
        if (!user) {
            return fail(400, { invalid: true })
        }

        //check if token is valid
        const validToken = await bcrypt.compare(token, user.resetTokenHash)
        if (!validToken) {
            return fail(400, { invalid: true })
        }

        const newPasswordHash = await bcrypt.hashSync(password, 10)
        await db.user.update({
            where: { id: id },
            data: { passwordHash: newPasswordHash }
        })

        await db.passwordReset.delete({
            where: { userId: id }
        })

        //redirect to login page
        throw redirect(302, '/login')



    }
}
