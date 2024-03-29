import {getAllPosts , getPostfromSearchQuery} from '$db/posts.js'
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
        if(data.get('title') === author.title || data.get('content') === author.username){
            console.log('no changes')
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



    }

}

export const load = async({params, url}) => {

    console.log('this is params')
    console.log(params)

    const searchTerm = params.searchTerm
    console.log("this is search term: " +  searchTerm)

    if(url.searchParams.has('sortBy')){
        let sortBy = url.searchParams.get('sortBy')
        const result = await getPostfromSearchQuery(sortBy, searchTerm)
        const data = {}
        data.posts = result
        data.query = searchTerm

        return EJSON.serialize(data)


    }else{

        const result = await getPostfromSearchQuery('top', searchTerm)
        const data = {}
        data.posts = result
        data.query = searchTerm

        console.log(data)
    
        return EJSON.serialize(data)

    }

}