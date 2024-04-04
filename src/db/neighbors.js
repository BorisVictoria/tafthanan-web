import client from '$db/mongo'
import { ObjectId } from 'mongodb'

const requests = client.db("tafthanan").collection("neighborRequests")
const users = client.db("tafthanan").collection("users")


export const getReceivedReqs = async(user) => {
    let result = await requests.findAll({recepient : user, status: pending})

    result = result.toArray()

    if(result){
        return result
    }


    return null
}


export const addFriend = async(recepientName, senderName) => {
    let recepient = await recepient.findOne({username : recepientName})

    if(recepient.friends) {
        let friendlist = recepient.friends
        friendlist.push(sender)
        let result = user.updateOne({username : recepientName}, {$set : {friends : friendlist}})
        return result
    } else {
        let friendlist = []
        let result = user.updateOne({username : recepientName}, {$set : { friends : friendlist}})
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
    console.log('nagsend ako sa db')

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
        
        let result = await user.updateOne({username : recepeintName}, {$set : {friends : recepientlist}})
        
 
        let senderlist = sender.friends

        let index1 = senderlist.indexOf(recepientName)
        const y = senderlist.splice(index1, 1)

        let result1 = await user.updateOne({username : senderName}, {$set : {friends : senderlist}})

        return true;


    } catch(err) {
        console.log(err)
        return false;
    }

    
}

export const acceptRequest = async(id) => {

    //set status to accepted
    try{

    let request = await getRequest(id)

    //smart
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

export const findRequest = async(user, userB) => {
    console.log(user, userB)
    let result = await requests.findOne({$or : [{sender : user, recepient : userB}, {sender : userB, recepient : user}], status : "pending"})
    console.log(result)

    if(result){
        if(result.sender === user){
            return "sentRequest"
        } else {
            return "receivedRequest"
        }
    }

    return false

}