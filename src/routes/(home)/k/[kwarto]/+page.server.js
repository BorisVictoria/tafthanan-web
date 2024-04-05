import { getPostsByKwarto } from "$db/posts"
import {EJSON} from 'bson'
import { getKwarto } from "$db/kwarto.js"
import { redirect } from "@sveltejs/kit"
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
            
            redirect(303, "?emptyContent&showModal=true")
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

export const load = async(event) => {

    const kwarto = await getKwarto(event.params.kwarto)

    if (!kwarto) {

        if(event.locals.user === undefined)
            redirect(303, '/login?plsLogIn')
        redirect(303, "/")


    }


    let posts
    if(event.url.searchParams.has('sortBy')){
        let query = event.url.searchParams.get('sortBy')
        posts = await getPostsByKwarto(event.params.kwarto, query)
    } else {
        posts = await getPostsByKwarto(event.params.kwarto)

    } 


  
    const data = {}

    data.kwarto = kwarto
    data.posts = posts

    return EJSON.serialize(data)


}