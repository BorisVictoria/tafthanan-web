import { getPostsByKwarto } from "$db/posts"
import {EJSON} from 'bson'
import { getKwarto } from "$db/kwarto.js"
import { redirect } from "@sveltejs/kit"

export const load = async(event) => {

    const kwarto = await getKwarto(event.params.kwarto)
    console.log(kwarto)

    if (!kwarto) {

        if(event.locals.user === undefined)
            redirect(303, '/login?plsLogIn')

        console.log('may male')
        console.log(event.params.kwarto)
        redirect(303, "/")


    }


    let posts
    if(event.url.searchParams.has('sortBy')){
        let query = event.url.searchParams.get('sortBy')
        console.log(query)
        posts = await getPostsByKwarto(event.params.kwarto, query)
    } else {
        posts = await getPostsByKwarto(event.params.kwarto)

    } 


  
    const data = {}

    data.kwarto = kwarto
    data.posts = posts

    return EJSON.serialize(data)


}