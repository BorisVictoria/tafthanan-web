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

export const createComment = async(data) => {
    
    let result

    if (data.parentComment === null) {
        const kwartoID = new ObjectId(data.kwartoID)
        const postID = new ObjectId(data.postID)
        result = await comments.insertOne({kwartoID: kwartoID, postID: postID, content: data.content, voteCount: 0, isEdited: false})
    } else {
        const kwartoID = new ObjectId(data.kwartoID)
        const postID = new ObjectId(data.postID)
        const parentComment = new ObjectId(data.parentComment)
        result = await comments.insertOne({kwartoID: data.kwartoID, postID: data.postID, parentComment: data.parentComment, content: data.content, voteCount: 0, isEdited: false })
    }

    if (result) {
        return result
    }

    return null

}

export const editComment = async(data) => {
    const objID = new ObjectId(data._id)
    const result = await comments.updateOne({_id: objID}, {$set: {content: data.content}})
    if (result) {
        return result
    }

    return null
}

export const upvoteComment = async(data) => {
    const objID = new ObjectId(data._id)
}

export const downvoteComment = async(data) => {
    const objID = new ObjectId(data._id)
}

export const deleteComment = async(id) => {
    const objID = new ObjectId(id)
    const result = await comments.findOne({_id: objID})
}