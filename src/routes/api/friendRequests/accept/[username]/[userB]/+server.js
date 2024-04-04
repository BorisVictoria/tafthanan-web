import { findRequest, acceptRequest } from '$db/neighbors'
import { json } from '@sveltejs/kit'


export const POST = async(event) => {

    console.log('hi')
    console.log(event)
    try{
    let res = await findRequest(event.params.username, event.params.userB)
    
    console.log(res)

    let id = res._id.toString()
    console.log(id)

    let add = await acceptRequest(id)

    console.log("added successfully: " + add)
   
    
    return json(add)

    } catch(err){
        console.log(err)
    }
    

}