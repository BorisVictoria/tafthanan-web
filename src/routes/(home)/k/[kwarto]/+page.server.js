import { getPostsByKwarto } from "$db/posts"
import {EJSON} from 'bson'
import { getKwarto } from "$db/kwarto.js"
import { redirect } from "@sveltejs/kit"

export const load = async(event) => {

    const kwarto = await getKwarto(event.params.kwarto)
    if (!kwarto) {
        redirect(303, "/")
    }

    const posts = await getPostsByKwarto(event.params.kwarto)
    const data = {}

    data.kwarto = kwarto
    data.posts = posts

    return EJSON.serialize(data)


}