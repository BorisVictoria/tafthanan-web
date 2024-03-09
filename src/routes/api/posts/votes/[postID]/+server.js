import { upvotePost, downvotePost } from "$db/posts"
import { getPostVote } from "$db/postVotes"
import {json} from "@sveltejs/kit"

export const GET = async({params, locals}) => {

    if (locals.user == null) {
        return json(null)
    }

    console.log(locals.user)

    const data = {
        userID: locals.user.userID,
        postID: params.postID,
    }
    
    const result = await getPostVote(data)
    if (result) {
        return json(result)
    }

    return json(null)
}

export const POST = async({request, locals}) => {

    if (locals.user == null) {
        return json(null)
    }
    
    const data = await request.json()
    data.userID = locals.user.userID
    // data.voteCount
    // data.isPost
    // data.postID
    // data.userID = locals.user.userID
    // data.vote // upvote or downvote

    if (data.vote === "upvote") {
        await upvotePost(data)
    } else if (data.vote === "downvote") {
        await downvotePost(data)
    }

    return json(true)
}