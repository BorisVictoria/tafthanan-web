import { ObjectId } from "mongodb";
import { getPost } from "$db/posts";
import { getParentComments } from "$db/comments"
import { EJSON } from "bson";


export const load = async({params}) => {

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

    return await EJSON.serialize(data)

}