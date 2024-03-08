import client from '$db/mongo'
import { ObjectId } from 'mongodb'
const commentVotes = client.db('tafthanan').collection('commentVotes')

export const getCommentVote = async(data) => {
    const commentID = new ObjectId(data.commentID)
    const userID = new ObjectId(data.userID)
    const result = await commentVotes.findOne({commentID: commentID, userID: userID})

    if (result) {
        return result
    }

    return null
}

export const createCommentVote = async(data) => {
    const commentID = new ObjectId(data.commentID)
    const userID = new ObjectId(data.userID)
    const result = await commentVotes.insertOne({commentID: commentID, userID: userID, vote: data.vote})

    if (result) {
        return result
    }

    return null

}

export const updateCommentVote = async(data) => {
    const commentID = new ObjectId(data.commentID)
    const userID = new ObjectId(data.userID)
    const result = await commentVotes.updateOne({commentID: commentID, userID: userID}, {$set: {vote: data.vote}})

    if (result) {
        return result
    }

    return null
}