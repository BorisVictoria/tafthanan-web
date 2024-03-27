import { deleteComment } from "$db/comments"
import { getPostVote } from "$db/postVotes"
import {json} from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

export const GET = async({params, locals}) => {

    if (locals.user == null) {
        return json(null)
    }

    const data = {
        postID: params.commentID
    }

    await deleteComment(data.postID)
}