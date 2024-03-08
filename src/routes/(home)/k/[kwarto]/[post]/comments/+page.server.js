import { ObjectId } from "mongodb";
import { getPost } from "$db/posts";
import { getParentComments } from "$db/comments"
import { EJSON } from "bson";
import { redirect } from "@sveltejs/kit";
import { getKwarto } from "$db/kwarto.js";

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