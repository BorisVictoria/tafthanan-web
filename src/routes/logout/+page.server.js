import {redirect} from '@sveltejs/kit'

export const load = async({cookies}) => {
    
    cookies.set('session', '', {
        path: "/",
        expires: new Date(0)
    })

    redirect(303, "/login")
}

export const actions = {
    default({cookies}) {
        cookies.set('session', '', {
            path: "/",
            expires: new Date(0)
        })

        redirect(303, "/login")
    }
    
}