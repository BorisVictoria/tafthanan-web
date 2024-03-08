import { Handle } from '@sveltejs/kit'
import { getToken } from '$db/users'

export const handle = async({event, resolve}) => {
    const session = event.cookies.get('session')
    
    if (!session) {
        return await resolve(event)
    }

    const user = await getToken(session)

    if (user) {
        event.locals.user = {
            username: user.username,
            userID: user._id.toString(),
            token: user.token,
        }
    }

    return await resolve(event)

}
