import client from '$db/mongo'
import { ObjectId } from 'mongodb'

const requests = client.db("tafthanan").collection("neighborRequests")
const users = client.db("tafthanan").collection("users")



export const addFriend = async(recepientName, senderName) => {
    let recepient = await users.findOne({username : recepientName})


    if(recepient.friends) {
        let friendlist = recepient.friends
        friendlist.push(senderName)
        let result = await users.updateOne({username : recepientName}, {$set : {friends : friendlist}})
        return result
    } else {
        let friendlist = []
        friendlist.push(senderName)
        let result = await users.updateOne({username : recepientName}, {$set : { friends : friendlist}})
        return result
    }
}

export const getRequest = async(id) => {
    let result = await requests.findOne({_id : new ObjectId(id)})

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

export const removeFriend = async(senderName, recepientName) => {


    try{
    let recepient = await users.findOne({username : recepientName})
    let sender = await users.findOne({username : senderName})

        let recepientlist = recepient.friends

        let index = recepientlist.indexOf(senderName)
        const x = recepientlist.splice(index, 1)

        
        let result = await users.updateOne({username : recepientName}, {$set : {friends : recepientlist}})
        
        
 
        let senderlist = sender.friends

        let index1 = senderlist.indexOf(recepientName)
        const y = senderlist.splice(index1, 1)

        let result1 = await users.updateOne({username : senderName}, {$set : {friends : senderlist}})

        return result1;


    } catch(err) {
        return false;
    }

    
}

export const acceptRequest = async(id) => {

    //set status to accepted
    try{

    let request = await getRequest(id)

    //smart
    await addFriend(request.sender, request.recepient)
    await addFriend(request.recepient, request.sender)
    
    let result = await requests.updateOne({_id : new ObjectId(id)}, {$set : {status: "accepted"}})

    if(result){
        return result
    }


    }catch(err){
        return false
    }

    //add friend to friendlist



}

export const declineRequest = async(id) => {

    //set status to declined
    let result =  await requests.updateOne({_id : new ObjectId(id)}, {$set : {status: "declined"}})

    if(result){
        return result
    }

    return null

}

export const findReceivedRequests = async(user) => {
    let result = await requests.find({recepient : user, status : "pending"})

    if(result){
        return result.toArray()
    }

    return false
}

export const findRequest = async(user, userB) => {
    let result = await requests.findOne({$or : [{sender : user, recepient : userB}, {sender : userB, recepient : user}], status : "pending"})

    if(result){
        return result
    }

    return false

}