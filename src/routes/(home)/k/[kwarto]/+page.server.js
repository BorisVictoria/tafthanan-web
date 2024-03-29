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

export const load = async(event) => {

    const kwarto = await getKwarto(event.params.kwarto)
    console.log(kwarto)

    if (!kwarto) {

        if(event.locals.user === undefined)
            redirect(303, '/login?plsLogIn')

        console.log('may male')
        console.log(event.params.kwarto)
        redirect(303, "/")


    }


    let posts
    if(event.url.searchParams.has('sortBy')){
        let query = event.url.searchParams.get('sortBy')
        console.log(query)
        posts = await getPostsByKwarto(event.params.kwarto, query)
    } else {
        posts = await getPostsByKwarto(event.params.kwarto)

    } 


  
    const data = {}

    data.kwarto = kwarto
    data.posts = posts

    return EJSON.serialize(data)


}