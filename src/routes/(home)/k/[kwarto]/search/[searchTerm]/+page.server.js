import {getAllPosts , getPostfromSearchQueryandKwarto} from '$db/posts.js'
import {EJSON} from 'bson'

export const load = async({params, url}) => {

    console.log('this is params')
    console.log(params)

    const searchTerm = params.searchTerm
    console.log("this is search term: " +  searchTerm)

    if(url.searchParams.has('sortBy')){
        let sortBy = url.searchParams.get('sortBy')
        const result = await getPostfromSearchQueryandKwarto(sortBy, searchTerm, params.kwarto)
        const data = {}
        data.posts = result
        data.query = searchTerm
        data.kwarto = params.kwarto

        return EJSON.serialize(data)


    }else{

        const result = await getPostfromSearchQueryandKwarto('top', searchTerm, params.kwarto)
        const data = {}
        data.posts = result
        data.query = searchTerm
        data.kwarto = params.kwarto

        console.log(data)
        console.log(url)
    
        return EJSON.serialize(data)

    }

}