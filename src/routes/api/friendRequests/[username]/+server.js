import { findReceivedRequests } from '$db/neighbors'
import { getUserFromList } from '$db/users'
import { json } from "@sveltejs/kit"


export const GET = async(event) => {

    try{

    const user = event.params.username
    const res = await findReceivedRequests(user)

    var usernames = []
    res.forEach((entry) => {
        usernames.push(entry.sender)
    })
    console.log("usernames " + usernames)


        const users = await getUserFromList(usernames)
        return ((json(users)))



    } catch(err){
        console.log(err)
        return json(false)
    }

}