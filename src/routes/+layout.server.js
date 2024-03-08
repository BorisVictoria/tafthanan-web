import {getAllUsers} from '$db/users'
import {EJSON} from 'bson'


export const load = async(event) => {

    let result = await getAllUsers()
    
    result = EJSON.serialize(result)

    return {
        user: event.locals.user,
        neighborlist:  result
    }

}