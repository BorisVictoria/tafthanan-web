import { ObjectId } from "mongodb";
import { getPost, editPost } from "$db/posts";
import { getParentComments, getComment } from "$db/comments"
import { EJSON } from "bson";
import { redirect } from "@sveltejs/kit";
import { getKwarto } from "$db/kwarto.js";
import { createComment, editComment } from "$db/comments"

export const actions = {
    submit: async(event) => {

        if(event.locals.user == null){
            redirect(303, '/login?plsLogIn')
        }

        const data = await event.request.formData()

        const post = {
            parentComment : data.get('replyingTo'),
            postID: event.params.post,
            content: data.get('content'),                
            author: event.locals.user.username,
            votes: 0,
        }

        console.log(post)

        const result = createComment(post)

        if (result) {
            return true
        }

        return false
    },

    editPost: async(event) => {

        if(event.locals.user == null){
            redirect(303, '/login?plsLogIn')
        }

        const data = await event.request.formData()

        console.log('data')
        console.log(data)

        //check if the author of post data is equal to current user.
        console.log('getting post')
        const author = await getPost(data.get('postID'))
        
        console.log('verifying author and user')
        console.log(event.locals.user.username, author.username)
        if(event.locals.user.username !== author.username){
            redirect(303, '/login')
        }

        //check if form is empty
        console.log('checking empty field')
        if(data.get('title') === "" || data.get('content') === ""){
            
            return false
        }

        //check if there are no changes
        if(data.get('title') === author.title || data.get('content') === author.content){
            console.log('no changes')
            return false
        }

        console.log('all forms good')

        const newContent = {
            _id : data.get('postID'),
            title : data.get('title'),
            content : data.get('content')
        }

        const result = await editPost(newContent)
        console.log(result)

        if(result) {
            return true
        }

        return false



    },

    editComment: async(event) => {
        if(event.locals.user == null){
            redirect(303, '/login?plsLogIn')
        }

        const data = await event.request.formData()

        console.log('data')
        console.log(data)

        //check if the author of post data is equal to current user.
        console.log('getting post')
        const author = await getComment(data.get('postID'))
        
        console.log('verifying author and user')
        console.log(event.locals.user.username, author.author)
        if(event.locals.user.username !== author.author){
            redirect(303, '/login')
        }

        //check if form is empty
        console.log('checking empty field')
        if(data.get('content') === ""){
            
            return false
        }

        //check if there are no changes
        if(data.get('content') === author.content){
            console.log('no changes')
            return false
        }

        console.log('all forms good')

        const newContent = {
            _id : data.get('postID'),
            content : data.get('content')
        }

        const result = await editComment(newContent)
        console.log(result)

        if(result) {
            return true
        }

        return false



    }

}



export const load = async(event) => {

    const kwarto = await getKwarto(event.params.kwarto)
    if (!kwarto) {
        redirect(303, "/")
    }

    const data = {}
    const postID = new ObjectId(event.params.post)

    const post = await getPost(postID)

    if (!post) {
        redirect(303, "/")
    }

    data.post = post

    let parentComments;
    if(!event.url.searchParams.has('sortBy')){
        parentComments = await getParentComments(postID)
    } else {
        parentComments = await getParentComments(postID, event.url.searchParams.get('sortBy'))
    }

    if (parentComments) {
        data.post.parentComments = parentComments
    } 

    return EJSON.serialize(data)

}