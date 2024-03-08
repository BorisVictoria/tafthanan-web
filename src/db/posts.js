import client from '$db/mongo'
import { ObjectId } from 'mongodb'

export const posts = client.db('tafthanan').collection('posts')

export const submitPost = async(data) => {



}


export const getPost = async(id) => {

    const objID = new ObjectId(id)
    const result = await posts.findOne({_id: objID})
    if (result) {
        return result
    }

    return null

}