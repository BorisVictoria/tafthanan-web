import client from '$db/mongo'
import { ObjectId } from 'mongodb'
import { getPostVote, createPostVote, updatePostVote } from '$db/postVotes'

export const posts = client.db('tafthanan').collection('posts')

export const getPost = async(id) => {

    const objID = new ObjectId(id)
    const result = await posts.findOne({_id: objID})
    if (result) {
        return result
    }

    return null

}

export const getAllPosts = async() => {

    let result = await posts.find({})
    result = result.toArray()

    if (result.length === 0) {
        return null
    }

    return result

}

export const getPostsByKwarto = async(kwarto) => {

    let result = await posts.find({kwarto: kwarto })
    result = result.toArray()

    if (result.length === 0) {
        return null
    }

    return result
}

export const getPostsByUser = async(username) => {

    let result = await posts.find({username: username})
    result = result.toArray()

    if (result.length === 0) {
        return null
    }

    return result
}
 
export const createPost = async(data) => {
    
    const result = await posts.insertOne({title: data.title, content: data.content, tags: null, username: data.username, kwarto: data.kwarto, voteCount: 0, datePosted: Date.now(), isEdited: false}) 

    if (result) {
        return result
    }

    return null

}

export const editPost = async(data) => {
    const objID = new ObjectId(data._id)
    const result = await posts.updateOne({_id: objID}, {$set: {title: data.title, content: data.content}})
    if (result) {
        return result
    }

    return null
}

export const upvotePost = async(data) => {
    const objID = new ObjectId(data.postID)
    let result = await getPostVote(data)
    if (result) {
        if (result.vote === true) {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: -1}})
            data.vote = null
            result = await updatePostVote(data)
        }
        else if (result.vote === false) {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: 2}})
            data.vote = true
            result = await updatePostVote(data)
        }
        else {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: 1}})
            data.vote = true
            result = await updatePostVote(data)
        }

    } else {
        data.vote = true
        result = await createPostVote(data)
        if (result) {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: 1}})
        } else {
            return null
        }
    }

    if (result) {
        return result
    }

    return null



}

export const downvotePost = async(data) => {
    const objID = new ObjectId(data.postID)
    let result = await getPostVote(data)
    if (result) {
        if (result.vote === true) {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: -2}})
            data.vote = false
            result = await updatePostVote(data)
        } else if (result.vote === false) {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: 1}})
            data.vote = null
            result = await updatePostVote(data)
        } else {
            result = await posts.updateOne({_id: objID}, {$inc: {voteCount: -1}})
            data.vote = false
            result = await updatePostVote(data)
        }
    } else {
        data.vote = false
        result = await createPostVote(data)
        if (result) {
            result = await posts.update({_id: objID}, {$inc: {voteCount: -1}})
        } else {
            return null
        }
    }

    if (result) {
        return result
    }

    return null
}

export const deletePost = async(id) => {
    const objID = new ObjectId(id)
    const result = await posts.updateOne({_id: objID}, {$set: {deleted: true}})
}