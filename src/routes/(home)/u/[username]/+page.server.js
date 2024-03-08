import {EJSON} from 'bson'
import {getUser} from '$db/users'
import {redirect} from '@sveltejs/kit'

export const load = async({params}) => {

    const user = await getUser(params.username)

    if (!!user) {
        user = EJSON.serialize(user)
        return {
            user: user
        }
    } 

    redirect(303, "/")

}
