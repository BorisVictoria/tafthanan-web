import client from '$db/mongo'
import {ObjectId} from 'mongodb'

export const users = client.db('tafthanan').collection('users')

export const registerUser = async(data) => {

    const result = await users.insertOne(data)
    return result

}

export const loginUser = async(data) => {

    const result = await users.findOne({username: data.username, password: data.password})
    return result

}

export const getUser = async(username) => {

    const result = await users.findOne({username: username})
    return result
}

export const getToken = async(token) => {
    
    const result = await users.findOne({token: token})
    if (result.tokenExpiry < Date.now()) {
        return null
    }

    return result
}

export const setToken = async(data) => {
    
    const result = await users.updateOne({username: data.username}, {$set: {token: data.token, tokenExpiry: data.tokenExpiry}})
    return result
}