export const load = async ({ url }) => {
    const token = url.searchParams.get('token')
    const id = url.searchParams.get('id')
    return { token, id }
}