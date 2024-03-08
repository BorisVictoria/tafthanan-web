import { getAllPosts } from '$db/posts.js'
import {EJSON} from 'bson'
import { json } from '@sveltejs/kit'

export const actions = {

    // createPost: async(event) => {
    //     const registration = await event.request.formData()
    //     const user = {
    //         email: registration.get('email'),
    //         username: registration.get('username'),
    //         password: registration.get('password'),
    //         passwordHash: await bcrypt.hash(registration.get('password'), 10),
    //         token: crypto.randomUUID(),
    //         tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), 
    //     }

    //     const data = await registerUser(user)

    //     return {
    //         success: !!data
    //     }

    // }

    // editPost: async(event) => {
    //     // edit using _id of post
    // }
    /*
    editPost: async(event) => {
        // edit using _id of post
    }

    // deletePost: async(event) => {
    //     // delete using _id of post
    // }

    // createComment: async(event) => {

    // }

    // editComment: async(event) => {
    //     // edit using _id of comment
    // }

    // deleteComment: async(event) => {
    //     // delete using _id of comment
    // }
    deleteComment: async(event) => {
        // delete using _id of comment
    }
    */
}

export const load = async() => {

    const result = await getAllPosts()
    const data = {}
    data.posts = result

    

    return EJSON.serialize(data)


}