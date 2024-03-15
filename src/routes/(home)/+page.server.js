import {getAllPosts} from '$db/posts.js'
import {EJSON} from 'bson'

export const load = async() => {

    const result = await getAllPosts()
    const data = {}
    data.posts = result

    return EJSON.serialize(data)

}