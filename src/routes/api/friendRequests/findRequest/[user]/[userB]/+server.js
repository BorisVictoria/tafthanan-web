import { findRequest } from '$db/neighbors'
import { json } from "@sveltejs/kit"


export const GET = async(event) => {

    console.log('hi')
    console.log(event)
    try{

    const user = event.params.user
    let res = await findRequest(event.params.user, event.params.userB)
    
    if(res.status != "pending"){
        return json(false)
    }
    
    if(res.sender == user){
        return json("sentRequest")
    }

    else if(res.recepient == user){
        return json("receivedRequest")
    }

    } catch(err){
        console.log(err)
        return json(false)
    }

}