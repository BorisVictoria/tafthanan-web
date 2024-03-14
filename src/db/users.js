import client from '$db/mongo'
import { ObjectId } from 'mongodb'


export const users = client.db('tafthanan').collection('users')

export const registerUser = async(data) => {

    const result = await users.insertOne(data)
    if (result) {
        return result
    }
    
    return null

}

export const getAllUsers = async() => {
    let result = await users.find({})
    result = result.toArray()

    if (result.length === 0) {
        return null
    }

    return result
}

export const getUser = async(username) => {

    const result = await users.findOne({username: username})
    if (result) {
        return result
    }

    return null
}

export const getUserByID = async(id) => {

    const objID = new ObjectId(id)
    const result = await users.findOne({_id: objID})
    if (result) {
        return result
    }

    return null
}

export const getToken = async(token) => {
    
    const result = await users.findOne({token: token})

    if (result?.tokenExpiry > Date.now()) {
        return result
    }

    return null
}

export const setToken = async(data) => {
    
    const result = await users.updateOne({username: data.username}, {$set: {token: data.token, tokenExpiry: data.tokenExpiry}})
    if (result) {
        return result
    }

    return null
    

}