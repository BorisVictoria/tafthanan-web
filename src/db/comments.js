import client from '$db/mongo'
import { getCommentVote, createCommentVote, updateCommentVote } from '$db/commentVotes'
import { ObjectId } from 'mongodb'

const users = client.db('tafthanan').collection('users')
const posts = client.db('tafthanan').collection('posts')
const comments = client.db('tafthanan').collection('comments')

export const getParentComments = async(id) => {
    const objID = new ObjectId(id)
    let result = await comments.find({postID: objID, parentComment: null})
    result = await result.toArray()

    if(result.length === 0) {
        return null
    }
    
    return result
}

export const getChildrenComments = async(id) => {
    const objID = new ObjectId(id)
    let result = await comments.find({parentComment: objID})
    result = await result.toArray()

    if(result.length === 0) {
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
    
    console.log(data)

    let result

    if (data.parentComment == null) {
        const postID = new ObjectId(data.postID)
        result = await comments.insertOne({postID: postID, content: data.content, voteCount: 0, datePosted: Date.now(), isEdited: false, author: data.author})
    } else {
        const kwartoID = new ObjectId(data.kwartoID)
        const postID = new ObjectId(data.postID)
        const parentComment = new ObjectId(data.parentComment)
        result = await comments.insertOne({postID: data.postID, parentComment: data.parentComment, content: data.content, voteCount: 0, isEdited: false, author: data.author, datePosted: Date.now()})
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
    const objID = new ObjectId(data.commentID)
    let result = await getCommentVote(data)
    if (result) {
        if (result.vote === true) {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: -1}})
            data.vote = null
            result = await updateCommentVote(data)
        }
        else if (result.vote === false) {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: 2}})
            data.vote = true
            result = await updateCommentVote(data)
        }
        else {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: 1}})
            data.vote = true
            result = await updateCommentVote(data)
        }

    } else {
        data.vote = true
        result = await createCommentVote(data)
        if (result) {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: 1}})
        } else {
            return null
        }
    }

    if (result) {
        return result
    }

    return null



}

export const downvoteComment = async(data) => {
    const objID = new ObjectId(data.commentID)
    let result = await getCommentVote(data)
    if (result) {
        if (result.vote === true) {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: -2}})
            data.vote = false
            result = await updateCommentVote(data)
        } else if (result.vote === false) {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: 1}})
            data.vote = null
            result = await updateCommentVote(data)
        } else {
            result = await comments.updateOne({_id: objID}, {$inc: {voteCount: -1}})
            data.vote = false
            result = await updateCommentVote(data)
        }
    } else {
        data.vote = false
        result = await createCommentVote(data)
        if (result) {
            result = await comments.update({_id: objID}, {$inc: {voteCount: -1}})

        } else {
            return null
        }
    }

    if (result) {
        return result
    }

    return null
}

export const deleteComment = async(id) => {
    const objID = new ObjectId(id)
    const result = await comments.updateOne({_id: objID}, {$set: {deleted: true}})
}