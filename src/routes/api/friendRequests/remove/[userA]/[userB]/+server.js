import { removeFriend } from '$db/neighbors'
import { json } from '@sveltejs/kit'


export const POST = async(event) => {

    try{
    
    const res = await removeFriend(event.params.userA, event.params.userB)
    return json(res)

    }catch(err){
        console.log('error on removing friend')
        return json(null)
    }


    
}