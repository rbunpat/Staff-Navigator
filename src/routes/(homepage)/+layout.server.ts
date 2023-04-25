export const load = async ({ cookies }) => {
    const token = cookies.get('token')
    if (token) {
        const user = true;
        return { user };
    }
    if (!token) {
        const user = false;
        return { user };
    }
}