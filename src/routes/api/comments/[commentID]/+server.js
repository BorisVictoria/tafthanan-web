import {getChildrenComments} from "$db/comments"
import {json} from "@sveltejs/kit"

export const GET = async(event) => {

    let result = await getChildrenComments(event.params.commentID)
    
    
    if(event.url.searchParams.has('sortBy')){
        result = await getChildrenComments(event.params.commentID, event.url.searchParams.get('sortBy'))
    }


    if (result === null) {
        return json(null)
    }

    return json(result)
}
