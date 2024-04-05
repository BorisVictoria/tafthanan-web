import {getAllPosts} from '$db/posts.js'
import {EJSON} from 'bson'
import { getPost, editPost } from "$db/posts";


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

        //check if the author of post data is equal to current user.
        const author = await getPost(data.get('postID'))
        if(event.locals.user.username !== author.username){
            redirect(303, '/login')
        }

        //check if form is empty
        if(data.get('title') === "" || data.get('content') === ""){
            
            redirect(303, "?emptyContent")
        }

        //check if there are no changes
        if(data.get('title') === author.title && data.get('content') === author.content){
            return false
        }

        const newContent = {
            _id : data.get('postID'),
            title : data.get('title'),
            content : data.get('content')
        }

        const result = await editPost(newContent)

        if(result) {
            return true
        }

        return false



    }

}

export const load = async({params, url}) => {

    if(url.searchParams.has('sortBy')){
        let query = url.searchParams.get('sortBy')
        const result = await getAllPosts(query)
        const data = {}
        data.posts = result

        return EJSON.serialize(data)


    }else{

        const result = await getAllPosts('new')
        const data = {}
        data.posts = result
    
        return EJSON.serialize(data)

    }

}