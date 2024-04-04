import { sendRequest } from '$db/neighbors'
import { json } from '@sveltejs/kit'

export const POST = async(event) => {

    console.log('hi')
    console.log(event)
    try{
    let res = await sendRequest(event.params.sender, event.params.requester)
    console.log(res)
    return json(res)

    } catch(err){
        console.log(err)
    }

}