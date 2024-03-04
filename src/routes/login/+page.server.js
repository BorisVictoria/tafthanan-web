import {registerUser, loginUser, setToken} from '$db/users'
import {EJSON} from 'bson'
import bcrypt from 'bcrypt'

// TODO: Add redirects for invalid form submission
import {browser} from '$app/environment'
import {fail, redirect} from '@sveltejs/kit'

export const load = async(event) => {
    if (event.locals.user) {
        redirect(303, "/")
    }

}

export const actions = {
    register: async(event) => {
        const registration = await event.request.formData()
        const user = {
            email: registration.get('email'),
            username: registration.get('username'),
            password: registration.get('password'),
            passwordHash: await bcrypt.hash(registration.get('password'), 10),
            token: crypto.randomUUID(),
            tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), 
        }

        const data = await registerUser(user)

        return {
            success: !!data
        }

    },

    login: async(event) => {
        const login = await event.request.formData()
        const user = {
            username: login.get('username'),
            password: login.get('password')
        }

        const data = await loginUser(user)

        if (data === null) {
            redirect(303, '/login')
        }

        const password = await bcrypt.compare(user.password, data.passwordHash)

        if (!password) {
            redirect(303, '/login')
        }

        data.token = crypto.randomUUID()
        data.tokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21)

        await setToken(data)

        event.cookies.set('session', data.token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 21,
        })

        redirect(303, "/")
        
    }
}
