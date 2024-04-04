import client from '$db/mongo'
import { ObjectId } from 'mongodb'

const requests = client.db("tafthanan").collection("requests")
const users = client.db("tafthanan").collection("users")


export const getReceivedReqs = async(user) => {
    let result = await requests.findAll({recepient : user, status: pending})

    result = result.toArray()

    if(result){
        return result
    }


    return null
}


export const addFriend = async(recepient, sender) => {
    let recepient = await users.findOne({username : recepient})

    if(recepient.friends) {
        let friendlist = user.friends
        friendlist.push(sender)
        let result = user.updateOne({username : username}, {$set : {friends : friendlist}})
        return result
    } else {
        let friendlist = []
        let result = user.updateOne({username : username}, {$set : { friends : friendlist}})
        return result
    }
}

export const getRequest = async(id) => {
    let result = await requests.findOne({_id : ObjectId(id)})

    if(result){
        return result
    }

    return null
}


export const sendRequest = async(sender, recepient) => {
    //time
    //sender
    //recepient
    //status: [pending, accepted, declined] 

    let result = await requests.insertOne({time : Date.now(), sender : sender, recepient : recepient, status: "pending"})

    if(result){
        return result
    }

    return null

}

export const acceptRequest = async(id) => {

    //set status to accepted
    try{

    let request = await getRequest(id)

    addFriend(request.sender, request.recepient)
    addFriend(request.recepient, request.sender)

    
    let result = await requests.updateOne({_id : ObjectId(id)}, {$set : {status: "accepted"}})

    return true


    }catch(err){
        return false
    }

    //add friend to friendlist



}

export const declineRequest = async(id) => {

    //set status to declined
    let result =  await requests.updateOne({_id : ObjectId(id)}, {$set : {status: "declined"}})

    if(result){
        return result
    }

    return null

}