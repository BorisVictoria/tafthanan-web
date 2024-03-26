import {getChildrenComments} from "$db/comments"
import {json} from "@sveltejs/kit"

export const GET = async(event) => {

    let result = await getChildrenComments(event.params.commentID)
    
    console.log(event.url)
    
    if(event.url.searchParams.has('sortBy')){
        console.log("children comments " + event.url.searchParams.get('sortBy'))
        result = await getChildrenComments(event.params.commentID, event.url.searchParams.get('sortBy'))
    }


    if (result === null) {
        return json(null)
    }

    return json(result)
}
