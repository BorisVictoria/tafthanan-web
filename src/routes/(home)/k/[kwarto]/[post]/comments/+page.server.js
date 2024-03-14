import { ObjectId } from "mongodb";
import { getPost } from "$db/posts";
import { getParentComments } from "$db/comments"
import { EJSON } from "bson";
import { redirect } from "@sveltejs/kit";
import { getKwarto } from "$db/kwarto.js";
import { createComment } from "$db/comments"

export const actions = {
    submit: async(event) => {
        const data = await event.request.formData()

        console.log(data.get('replyingTo'))
        console.log(data.get('postID'))


        const post = {
            parentComment : data.get('replyingTo'),
            postID: data.get('postID'),
            content: data.get('content'),                
            author: event.locals.user.username,
            votes: 0,
        }

        const result = createComment(post)

        if (result) {
            return true
        }

        return false
    }
}

export const load = async({params}) => {

    const kwarto = await getKwarto(params.kwarto)
    if (!kwarto) {
        redirect(303, "/")
    }

    const data = {}
    const postID = new ObjectId(params.post)

    const post = await getPost(postID)

    if (!post) {
        redirect(303, "/")
    }

    data.post = post

    const parentComments = await getParentComments(postID)

    if (parentComments) {
        data.post.parentComments = parentComments
    } 

    return EJSON.serialize(data)

    

}