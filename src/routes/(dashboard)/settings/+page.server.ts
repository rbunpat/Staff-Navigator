import { fail, redirect } from "@sveltejs/kit";

import { db } from "$lib/server/database";
import jwt from "jsonwebtoken";

import { randomBytes, createHash } from 'crypto';

const generateRandomToken = (length: number): string => {
    const randomBytesBuffer = randomBytes(Math.ceil(length / 2));
    const token = randomBytesBuffer.toString('hex').slice(0, length);
    return token;
};

const generateGravatarHash = (email: string): string => {
    const emailHash = createHash("md5").update(email).digest("hex");
    return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
};

export const load = async ({ cookies }) => {
    const token = cookies.get("token");
    if (!token) {
        throw redirect(302, "/login");
    }

    const email = jwt.verify(token, import.meta.env.VITE_JWTSECRET).email;
    const user = await db.user.findUnique({ where: { email }, select: { id: true, caneId: true } });
    if (!user) {
        throw redirect(302, "/");
    }
    const caneId = user.caneId;
    const userId = user.id;
    const avatarURL = generateGravatarHash(email);
    const apibruh = await db.devToken.findFirst({ where: { caneId } });
    if (!apibruh) {
        return { apiToken: 'No API Token found', found: false, email: email, caneId: caneId, userId: userId, avatarURL: avatarURL };
    }
    const apiToken = apibruh.devToken;
    return { apiToken: apiToken, found: true, email: email, caneId: caneId, userId: userId, avatarURL: avatarURL };
};

export const actions = {
    token: async ({ cookies, request }) => {
        const token: string | undefined = cookies.get("token");

        if (token !== undefined) {
            const email = jwt.verify(token, import.meta.env.VITE_JWTSECRET).email;
            const user = await db.user.findUnique({ where: { email } });
            if (!user) {
                throw redirect(302, "/");
            }
            try {
                const cane = await db.user.findUnique({
                    where: { email },
                    select: { caneId: true },
                })

                const caneId = cane.caneId;
                const apiToken = generateRandomToken(64);

                await db.devToken.upsert({
                    where: { caneId },
                    update: { devToken: apiToken },
                    create: { caneId, devToken: apiToken }
                })

                return { apiToken: apiToken };

            } catch (error) {
                console.log(error);
            }


        } else {
            console.log('tokenbruh is undefined');
        }


    }
}
