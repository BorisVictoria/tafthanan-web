import { sendRequest } from '$db/neighbors'


export const POST = async(event) => {

    console.log('hi')
    console.log(event)
    try{
    let res = await sendRequest(event.params.sender, event.params.requester)
    console.log(res)
    return res

    } catch(err){
        console.log(err)
    }

}