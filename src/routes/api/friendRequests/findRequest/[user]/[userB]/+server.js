import { findRequest } from '$db/neighbors'
import { json } from "@sveltejs/kit"


export const GET = async(event) => {

    console.log('hi')
    console.log(event)
    try{

    let res = await findRequest(event.params.user, event.params.userB)
    console.log('res: '+ res)
    return json(res)

    } catch(err){
        console.log(err)
        return json(false)
    }

}