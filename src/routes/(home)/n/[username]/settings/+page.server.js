import {changePassword, changePfp, changeBio} from '$db/users'
import {redirect} from '@sveltejs/kit'

export const actions = {
    password: async(event) => {
        const request = await event.request.formData()
        
        let regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/

        if(!regex.test(request.get('newpass'))){
            redirect(303, `/n\\${event.locals.user.username}/settings?wrongPasswordFormat`)
        }

        console.log(event.locals.user)
        const data = {
            username: event.locals.user.username,
            password: request.get('newpass'),
        }

        const result = await changePassword(data)
        console.log(result)
        redirect(303, "/logout")

    },  

    pfp: async(event) => {
        const request = await event.request.formData()

        const data = {
            username: event.locals.user.username,
            pfp: request.get('pfp'),
        }

        const result = await changePfp(data)
        
        redirect(303, "/")
        

    },

    bio: async(event) => {
        const request = await event.request.formData()

        const data = {
            username: event.locals.user.username,
            bio: request.get('bio'),
        }

        const result = await changeBio(data)
        
        redirect(303, "/")

    },

}

export const load = async(event) => {

    if (event.locals.user == null) {
        redirect(303, "/")
    }

    if (event.locals.user.username !== event.params.username) {
        redirect(303, "/")
    }

}
