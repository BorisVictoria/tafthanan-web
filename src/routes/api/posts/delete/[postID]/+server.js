import { deletePost } from "$db/posts"
import { getPostVote } from "$db/postVotes"
import {json} from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

export const GET = async({params, locals}) => {

    if (locals.user == null) {
        return json(null)
    }

    const data = {
        postID: params.postID
    }

    await deletePost(data.postID)

    return json(null)
}