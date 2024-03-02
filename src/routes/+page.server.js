import {registerUser, loginUser} from '$db/users'


// TODO: Add redirects for invalid form submission
import {browser} from '$app/environment'
import {goto} from '$app/navigation'
import {fail, redirect} from '@sveltejs/kit'

export const actions = {
    register: async(event) => {
        const registration = await event.request.formData()
        const user = {
            email: registration.get('email'),
            username: registration.get('username'),
            password: registration.get('password'),
            confirmPassword: registration.get('confirmPassword')
        }

        const result = await registerUser(user)
        return {result: result.acknowledged}

    },

    login: async(event) => {
        const login = await event.request.formData()
        const user = {
            username: login.get('username'),
            password: login.get('password')
        }

        const result = await loginUser(user)

        if (!!result) {
            redirect(303, '/home')
        }

        return {success: !!result}
        
    }
}
