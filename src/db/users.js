import client from '$db/mongo'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export const users = client.db('tafthanan').collection('users')

export const registerUser = async(data) => {

    const result = await users.insertOne(data)
    if (result) {
        return result
    }
    
    return null

}

export const getAllUsers = async() => {
    let result = await users.find({}).project({password : false, passwordHash : false, token: false, tokenExpiry: false})
    result = result.toArray()

    if (result.length === 0) {
        return null
    }

    return result
}

export const getUser = async(username) => {

    const result = await users.findOne({username: username}, {projection : {password : false, passwordHash : false, token: false, tokenExpiry: false}})
    console.log('this is result')
    console.log(result)
    if (result) {
        return result
    }

    return null
}

export const getUserAuth = async(username) => {

    const result = await users.findOne({username: username})
    console.log('this is result')
    console.log(result)
    if (result) {
        return result
    }

    return null

}

export const changePassword = async(data) => {
    
    const hash = await bcrypt.hash(data.password, 10)
    const result = await users.updateOne({username: data.username}, {$set: {password: data.password, passwordHash: hash, token: crypto.randomUUID, tokenExpiry: Date.now()}})
    if (result) {
        return result
    }

    return null

}

export const changePfp = async(data) => {
    
    const result = await users.updateOne({username: data.username}, {$set: {pfp: data.pfp}})
    if (result) {
        return result
    }

    return null

}

export const changeBio = async(data) => {
    
    const result = await users.updateOne({username: data.username}, {$set: {bio: data.bio}})
    if (result) {
        return result
    }

    return null

}

export const getPfpByUsername = async(username) => {
    let result = await users.findOne({username: username})
    
    if (result) {
        result = {pfp : result.pfp}
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