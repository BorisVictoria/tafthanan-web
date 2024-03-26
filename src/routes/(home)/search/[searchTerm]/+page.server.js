import {getAllPosts , getPostfromSearchQuery} from '$db/posts.js'
import {EJSON} from 'bson'

export const load = async({params, url}) => {

    console.log('this is params')
    console.log(params)

    const searchTerm = params.searchTerm
    console.log("this is search term: " +  searchTerm)

    if(url.searchParams.has('sortBy')){
        let sortBy = url.searchParams.get('sortBy')
        const result = await getPostfromSearchQuery(sortBy, searchTerm)
        const data = {}
        data.posts = result
        data.query = searchTerm

        return EJSON.serialize(data)


    }else{

        const result = await getPostfromSearchQuery('top', searchTerm)
        const data = {}
        data.posts = result
        data.query = searchTerm

        console.log(data)
    
        return EJSON.serialize(data)

    }

}