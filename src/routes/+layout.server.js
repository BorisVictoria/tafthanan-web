import {getAllUsers, getUserFromList} from '$db/users'
import {getAllKwartos} from '$db/kwarto'
import {EJSON} from 'bson'


export const load = async(event) => {


    let result;
    if(event.locals.user != undefined && event.locals.user.friends){
        result = await getUserFromList(event.locals.user.friends)

    } else{
        result = null
    }
    
    
    let all = await getAllUsers()


    let kwartolistres = await getAllKwartos()
    
    result = EJSON.serialize(result)
    all = EJSON.serialize(all)
    kwartolistres = EJSON.serialize(kwartolistres)

    return {
        user: event.locals.user,
        neighborlist:  result,
        allList: all,
        kwartolist: kwartolistres
    }

}