import {getAllUsers} from '$db/users'
import {getAllKwartos} from '$db/kwarto'
import {EJSON} from 'bson'


export const load = async(event) => {

    let result = await getAllUsers()
    let kwartolistres = await getAllKwartos()
    
    result = EJSON.serialize(result)
    kwartolistres = EJSON.serialize(kwartolistres)

    return {
        user: event.locals.user,
        neighborlist:  result,
        kwartolist: kwartolistres
    }

}