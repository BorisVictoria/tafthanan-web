import {EJSON} from 'bson'
import {getUser} from '$db/users'
import {redirect} from '@sveltejs/kit'
import { getPostsByUser } from '$db/posts.js'

export const load = async({params}) => {

    const user = await getUser(params.username)
    if (!user) {
        redirect (303, "/")
    }

    const data = {}

    data.userProfile = user
    data.posts = await getPostsByUser(user.username)

    return EJSON.serialize(data)

}
