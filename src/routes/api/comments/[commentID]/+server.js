import {getChildrenComments} from "$db/comments"
import {json} from "@sveltejs/kit"

export const GET = async({params}) => {

    const result = await getChildrenComments(params.commentID)
    
    if (result === null) {
        return json(null)
    }

    return json(result)
}
