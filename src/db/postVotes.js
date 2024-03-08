import client from '$db/mongo'
import { ObjectId } from 'mongodb'
const postVotes = client.db('tafthanan').collections('postVotes')

export const getPostVote = async(data) => {
    const postID = new ObjectId(data.postID)
    const userID = new ObjectId(data.userID)
    const result = await postVotes.findOne({postID: postID, userID: userID})

    if (result) {
        return result
    }

    return null
}

export const createPostVote = async(data) => {
    const postID = new ObjectId(data.postID)
    const userID = new ObjectId(data.userID)
    const result = await postVotes.insertOne({postID: postID, userID: userID, vote: data.vote})

    if (result) {
        return result
    }

    return null

}

export const updatePostVote = async(data) => {
    const postID = new ObjectId(data.postID)
    const userID = new ObjectId(data.userID)
    const result = await postVotes.updateOne({postID: postID, userID: userID}, {$set: {vote: data.vote}})

    if (result) {
        return result
    }

    return null
}