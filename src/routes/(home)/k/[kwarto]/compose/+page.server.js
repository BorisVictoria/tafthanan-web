import {createPost} from "$db/posts"
import { getKwarto } from "$db/kwarto.js"
import { redirect } from "@sveltejs/kit"

export const actions = {
    submit: async(event) => {
        const data = await event.request.formData()
        const post = {
            title: data.get('title'),
            content: data.get('content'),
            username: event.locals.user.username,
            voteCount: 0,
            kwarto: event.params.kwarto
        }

        const result = createPost(post)

        if (result) {
            return true
        }

        return false
    }
}

export const load = async(event) => {
    if (event.locals.user === undefined) {
        redirect(303, "/login")
    }
    const kwarto = await getKwarto(event.params.kwarto)
    if (!kwarto) {
        redirect(303, "/")
    }

    return null
}