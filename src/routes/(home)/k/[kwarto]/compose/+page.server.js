import {createPost} from "$db/posts"
import { getKwarto } from "$db/kwarto.js"
import { redirect } from "@sveltejs/kit"
import { EJSON } from "bson"

export const actions = {
    submit: async(event) => {
        const data = await event.request.formData()
        

        if(data.get('content') == ""){
            redirect(303, '?emptyContent')
        }

        const post = {
            title: data.get('title'),
            content: data.get('content'),
            username: event.locals.user.username,
            voteCount: 0,
            kwarto: event.params.kwarto
        }

        const result = createPost(post)

        if (result) {
            redirect(303, `/k/${event.params.kwarto}`)
        }

        return false
    }
}

export const load = async(event) => {

    console.log(event.params.kwarto)

    if (event.locals.user === undefined) {
        console.log(event.locals.user)
        redirect(303, "/login?plsLogIn")
    }

    const kwarto = await getKwarto(event.params.kwarto)

    if (!kwarto) {
        redirect(303, "/")
    }

    const data = {}
    data.kwarto = kwarto

    return EJSON.serialize(data)
}