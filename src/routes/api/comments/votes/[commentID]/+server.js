import { upvoteComment, downvoteComment} from "$db/comments"
import { getCommentVote} from "$db/commentVotes"
import {json} from '@sveltejs/kit'

export const GET = async({params, locals}) => {
    const data = {
        userID: locals.user.userID,
        commentID: params.commentID,
    }
    const result = await getCommentVote(data)
    if (result) {
        return json(result)
    }

    return json(null)
}

export const POST = async({request, locals}) => {
    const body = await request.json()
    const {data} = body

    // data.voteCount
    // data.isPost
    // data.commentID
    data.userID = locals.user.userID
    // data.vote // upvote or downvote

    if (data.vote === "upvote") {
        await upvoteComment(data)
    } else if (data.vote === "downvote") {
        await downvoteComment(data)
    }

    return json(true)

}