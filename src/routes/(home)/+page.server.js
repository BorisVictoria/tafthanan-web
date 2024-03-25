import {getAllPosts} from '$db/posts.js'
import {EJSON} from 'bson'

export const load = async({params, url}) => {

    if(url.searchParams.has('sortBy')){
        let query = url.searchParams.get('sortBy')
        console.log(query)
        const result = await getAllPosts(query)
        const data = {}
        data.posts = result

        return EJSON.serialize(data)


    }else{

        const result = await getAllPosts('top')
        const data = {}
        data.posts = result
    
        return EJSON.serialize(data)

    }

}