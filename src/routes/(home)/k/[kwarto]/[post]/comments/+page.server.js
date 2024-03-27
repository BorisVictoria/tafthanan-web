import { ObjectId } from "mongodb";
import { getPost } from "$db/posts";
import { getParentComments } from "$db/comments"
import { EJSON } from "bson";
import { redirect } from "@sveltejs/kit";
import { getKwarto } from "$db/kwarto.js";
import { createComment } from "$db/comments"

export const actions = {
    submit: async(event) => {

        if(event.locals.user == null){
            redirect(303, '/login')
        }

        const data = await event.request.formData()

        const post = {
            parentComment : data.get('replyingTo'),
            postID: event.params.post,
            content: data.get('content'),                
            author: event.locals.user.username,
            votes: 0,
        }

        console.log(post)

        const result = createComment(post)

        if (result) {
            return true
        }

        return false
    }
}

export const load = async(event) => {

    const kwarto = await getKwarto(event.params.kwarto)
    if (!kwarto) {
        redirect(303, "/")
    }

    const data = {}
    const postID = new ObjectId(event.params.post)

    const post = await getPost(postID)

    if (!post) {
        redirect(303, "/")
    }

    data.post = post

    let parentComments;
    if(!event.url.searchParams.has('sortBy')){
        parentComments = await getParentComments(postID)
    } else {
        parentComments = await getParentComments(postID, event.url.searchParams.get('sortBy'))
    }

    if (parentComments) {
        data.post.parentComments = parentComments
    } 

    return EJSON.serialize(data)

}