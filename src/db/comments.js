import client from '$db/mongo'
import { ObjectId } from 'mongodb'

const users = client.db('tafthanan').collection('users')
const posts = client.db('tafthanan').collection('posts')
const comments = client.db('tafthanan').collection('comments')

export const getParentComments = async(id) => {
    const objID = new ObjectId(id)
    let result = await comments.find({postID: objID, parentComment: null})
    result = await result.toArray()

    if(result.length === 0) {
        console.log("No parent comments found!")
        return null
    }
    
    return result
}

export const getChildrenComments = async(id) => {
    const objID = new ObjectId(id)
    let result = await comments.find({parentComment: objID})
    result = await result.toArray()

    if(result.length === 0) {
        console.log("No children comments found!")
        return null
    }
    
    return result
}

export const getComment = async(id) => {
    const objID = new ObjectId(id)
    const result = await comments.findOne({_id: objID})
    if (result) {
        return result
    } 

    return null

}