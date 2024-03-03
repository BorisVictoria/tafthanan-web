import { Handle } from '@sveltejs/kit'

export const handle = async({event, resolve}) => {
    const session = event.cookies.get('session')
    return resolve(event)
}
