import {registerUser, getUser, getUserAuth, setToken} from '$db/users'
import bcrypt from 'bcrypt'

// TODO: Add redirects for invalid form submission
import {redirect} from '@sveltejs/kit'



export const load = async(event) => {
    if (event.locals.user) {
        redirect(303, "/")
    }

}

export const actions = {
    register: async(event) => {
        const registration = await event.request.formData()

        const isTaken = await getUser(registration.get('username'))
        if(isTaken != null){
            redirect(303, '/login?usernameTaken')
        }

        let noSpace = /^[a-zA-Z0-9]+$/

        if(!noSpace.test(registration.get('username'))){
            redirect(303, '/login?wrongUsernameFormat')
        }


        let regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/

        if(!regex.test(registration.get('password'))){
            redirect(303, '/login?wrongPasswordFormat')
        }

        if(registration.get('password') != registration.get('confirmPassword')){
            redirect(303, '/login?confirmPasswordWrong')
        }

        const user = {
            email: registration.get('email'),
            username: registration.get('username'),
            passwordHash: await bcrypt.hash(registration.get('password'), 10),
            token: crypto.randomUUID(),
            tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), 
            bio: "<i>New to tafthanan!</i>"
        }

        const data = await registerUser(user)

        redirect(303, '/login?successReg')

        /*
        return {
            success: !!data
        }*/
        

    },

    login: async(event) => {
        const login = await event.request.formData()
        const user = {
            username: login.get('username'),
            password: login.get('password')
        }

        const data = await getUserAuth(user.username)

        if (data === null) {
            // notifications.wrong_username("Invalid username")
            redirect(303, '/login?wrongUsername')
            
        }

        const password = await bcrypt.compare(user.password, data.passwordHash)

        if (!password) {
            // notifications.wrong_password("Invalid password")
            redirect(303, '/login?wrongPassword')
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
