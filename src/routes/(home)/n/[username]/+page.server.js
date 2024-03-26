import {EJSON} from 'bson'
import {getUser} from '$db/users'
import {redirect} from '@sveltejs/kit'
import { getPostsByUser } from '$db/posts.js'

export const load = async(event) => {

    const user = await getUser(event.params.username)
    if (!user) {
        redirect (303, "/")
    }

    const data = {}

    data.userProfile = user

    
    if(event.url.searchParams.has('sortBy')){
        data.posts = await getPostsByUser(user.username, event.url.searchParams.get('sortBy'))
    }
    else{
        data.posts = await getPostsByUser(user.username)
    }
    

    return EJSON.serialize(data)
}
