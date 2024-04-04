import { findReceivedRequests } from '$db/neighbors'
import { json } from "@sveltejs/kit"


export const GET = async(event) => {

    try{

    const user = event.params.user
    let res = await findReceivedRequests(event.params.user)
    
    if(res.status != "pending"){
        return json(res)
    }


    } catch(err){
        console.log(err)
        return json(false)
    }

}